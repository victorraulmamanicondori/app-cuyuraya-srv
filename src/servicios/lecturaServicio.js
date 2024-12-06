import logger from '../config/logger.js';
import lecturaRepositorio from '../repositorios/lecturaRepositorio.js';
import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import tarifaRepositorio from '../repositorios/tarifaRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import { LecturaEstados } from '../constantes/estados.js';
import { TarifaCodigos } from '../constantes/tarifas.js';
import LecturaModelo from '../modelos/LecturaModelo.js';
import ReciboModelo from '../modelos/ReciboModelo.js';

class LecturaServicio {

  calcularM3Consumido(lecturaActual, lecturaAnterior) {
    if (lecturaAnterior && lecturaActual) {
      return lecturaActual - lecturaAnterior;
    }
    return lecturaActual;
  }

  calcularMontoPagar(m3Consumido, tarifa) {
    const m3ConsumoBase = tarifa.m3Consumo;// consumo base
    const montoTarifaBase = tarifa.montoTarifa; // tarifa base
    const montoExtraPorM3 = tarifa.montoExtraPorM3; // monto extra a pagar por cada m3

    if (m3Consumido <= m3ConsumoBase) {
      return montoTarifaBase;
    } else {
      const m3ConsumoExtra = m3Consumido - m3ConsumoBase;
      const montoExtraTotal = m3ConsumoExtra * montoExtraPorM3;
      const montoTotal = montoTarifaBase + montoExtraTotal;

      return montoTotal;
    }
  }

  generarNumeroRecibo(idMedidor, idUsuario, ultimaLectura) {
    const idLecturaAnterior = ultimaLectura ? parseInt(ultimaLectura.idLectura) : 0;
    return `${idMedidor}-${idUsuario}-${idLecturaAnterior + 1}`;
  }

  calcularFechaLimitePago() {
    const fechaLimitePago = new Date();
    fechaLimitePago.setDate(fechaLimitePago.getDate() + 20); 
    return fechaLimitePago;
  }

  async registrarLectura({ idLectura, codigoMedidor, lecturaActual, dni, fechaLectura }) {
    logger.info(`idLectura: ${idLectura}, codigoMedidor:${codigoMedidor}, lectura:${lecturaActual}`);
    
    if (idLectura) {
      const lecturaPorId = lecturaRepositorio.obtenerLecturaPorIdLectura(idLectura);
      if (lecturaPorId) {
        return this.actualizarLectura({idLectura, codigoMedidor, lecturaActual, dni, fechaLectura});
      }
    }

    logger.info("INSERTAR NUEVA LECTURA");

    const medidor = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor); // Para idMedidor y numeroRecibo

    if (!medidor) {
      throw new Error('Codigo del medidor no existe, ingrese codigo valido');
    }

    logger.info(`idMedidor:${medidor.idMedidor}`);

    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuario) {
      throw new Error(`Usuario con dni ${dni} no existe`);
    }

    logger.info(`idUsuario:${usuario.idUsuario}`);

    if (medidor.idUsuario !== usuario.idUsuario) {
      throw new Error(`Codigo del medidor ${codigoMedidor} no esta asignado al usuario con dni ${dni}`);
    }

    let ultimaLectura = await lecturaRepositorio.obtenerLecturaAnterior({ idMedidor: medidor.idMedidor, fechaLectura }); // Para lecturaAnterior y numeroRecibo
    const lecturaAnterior = ultimaLectura ? ultimaLectura.lecturaActual: 0;

    logger.info(`lecturaAnterior:${lecturaAnterior}`);

    const m3Consumido = this.calcularM3Consumido(lecturaActual, lecturaAnterior);

    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE); // Para idTarifa y montoPagar

    if (!tarifa) {
      throw new Error('Tarifa para calcular monto a pagar no esta registrado');
    }

    const montoPagar = this.calcularMontoPagar(m3Consumido, tarifa);

    const ultimoResultado = await lecturaRepositorio.obtenerUltimoLecturaRegistrado();

    if (ultimoResultado && ultimoResultado.length > 0) {
      ultimaLectura = ultimoResultado[0];
    } else {
      ultimaLectura = null;
    }

    const numeroRecibo = this.generarNumeroRecibo(medidor.idMedidor, medidor.idUsuario, ultimaLectura);

    logger.info(`Generacion numeroRecibo = ${numeroRecibo}`);

    const fechaLimitePago = this.calcularFechaLimitePago();

    const resultado = await lecturaRepositorio.registrarLectura({
      idMedidor: medidor.idMedidor,
      lecturaActual,
      lecturaAnterior,
      m3Consumido,
      idTarifa: tarifa.idTarifa,
      montoPagar,
      numeroRecibo,
      fechaLimitePago,
      fechaLectura,
      estado: LecturaEstados.REGISTRADO
    });
    
    if (!resultado) {
      throw new Error('No se pudo registrar lectura, intente nuevamente');
    }

    return { idLectura: resultado };
  }

  async actualizarLectura({idLectura, codigoMedidor, lecturaActual, dni, fechaLectura, estado}) {

    logger.info(`ACTUALIZAR LECTURA: idLectura:${idLectura}, codigoMedidor:${codigoMedidor}, lectura:${lecturaActual}`);

    if (!idLectura) {
      throw new Error("Id de lectura es requerido para actualizar");
    }

    logger.info(`Buscando lectura por id=${idLectura}`);

    const lecturaAnteriorActualizar = await lecturaRepositorio.obtenerLecturaPorIdLectura(idLectura);

    logger.info(`idLectura: ${lecturaAnteriorActualizar.idLectura}, estado: ${lecturaAnteriorActualizar.estado}, numeroRecibo: ${lecturaAnteriorActualizar.numeroRecibo}`);

    if (!lecturaAnteriorActualizar || lecturaAnteriorActualizar.length === 0) {
      throw new Error(`No existe lectura registrado para id ${idLectura}`);
    }

    if (lecturaAnteriorActualizar.estado === LecturaEstados.PAGADO) {
      throw new Error(`Lectura con id ${idLectura} ya esta PAGADO, no se puede actualizar`);
    }

    if (lecturaAnteriorActualizar.estado === LecturaEstados.ANULADO) {
      throw new Error(`Lectura con id ${idLectura} ya esta ANULADO, no se puede actualizar`);
    }

    if (estado && estado === LecturaEstados.ANULADO) {
      return await lecturaRepositorio.anularLectura(idLectura);
    }
    
    const medidor = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor); // Para idMedidor y numeroRecibo

    if (!medidor) {
      throw new Error('Codigo del medidor no existe, ingrese codigo valido');
    }

    logger.info(`idMedidor:${medidor.idMedidor}`);

    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuario) {
      throw new Error(`Usuario con dni ${dni} no existe`);
    }

    logger.info(`idUsuario:${usuario.idUsuario}`);

    if (medidor.idUsuario !== usuario.idUsuario) {
      throw new Error(`Codigo del medidor ${codigoMedidor} no esta asignado al usuario con dni ${dni}`);
    }

    const ultimaLectura = await lecturaRepositorio.obtenerLecturaAnterior({ idMedidor: medidor.idMedidor, fechaLectura }); // Para lecturaAnterior y numeroRecibo
    const lecturaAnterior = ultimaLectura ? ultimaLectura.lecturaActual: 0;

    logger.info(`lecturaAnterior:${lecturaAnterior}`);

    const m3Consumido = this.calcularM3Consumido(lecturaActual, lecturaAnterior);

    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE); // Para idTarifa y montoPagar

    if (!tarifa) {
      throw new Error('Tarifa para calcular monto a pagar no esta registrado');
    }

    const montoPagar = this.calcularMontoPagar(m3Consumido, tarifa);

    logger.info(`**** numero Recibo = ${lecturaAnteriorActualizar.numeroRecibo}` );

    const lecturaActualizado = {
      idLectura,
      idMedidor: medidor.idMedidor,
      lecturaActual,
      lecturaAnterior,
      m3Consumido,
      idTarifa: tarifa.idTarifa,
      montoPagar,
      numeroRecibo: lecturaAnteriorActualizar.numeroRecibo,
      fechaLimitePago: lecturaAnteriorActualizar.fechaLimitePago,
      fechaLectura,
      estado: lecturaAnteriorActualizar.estado
    };

    const idLecturaActualizado = await lecturaRepositorio.actualizarLectura(lecturaActualizado);

    if (!idLecturaActualizado) {
      throw new Error('No se pudo actualizar lectura, intente nuevamente');
    }

    return { idLectura: idLecturaActualizado };
  }

  async obtenerLecturasPorMedidor(page, limit, codigoMedidor) {

    if (!codigoMedidor) {
      throw new Error('Codigo del medidor es requerido');
    }

    const medidor = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor);

    if (!medidor) {
      throw new Error(`No existe medidor con codigo ${medidor.idMedidor}`);
    }

    const idMedidor = medidor.idMedidor;

    return lecturaRepositorio.obtenerLecturasPorMedidor({page, limit, idMedidor});
  }

  formateoFechaYMD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar cero si es necesario
    const day = String(date.getDate()).padStart(2, '0'); // Agregar cero si es necesario

    return `${year}-${month}-${day}`;
  }

  async borradorLectura({ codigoMedidor, lecturaActual, dni, fechaLectura }) {
    logger.info(`codigoMedidor:${codigoMedidor}, lectura:${lecturaActual}`);
    
    const medidor = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor); // Para idMedidor y numeroRecibo

    if (!medidor) {
      throw new Error('Codigo del medidor no existe, ingrese codigo valido');
    }

    logger.info(`idMedidor:${medidor.idMedidor}`);

    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuario) {
      throw new Error(`Usuario con dni ${dni} no existe`);
    }

    logger.info(`idUsuario:${usuario.idUsuario}`);

    if (medidor.idUsuario !== usuario.idUsuario) {
      throw new Error(`Codigo del medidor ${codigoMedidor} no esta asignado al usuario con dni ${dni}`);
    }

    let ultimaLectura = await lecturaRepositorio.obtenerLecturaAnterior({ idMedidor: medidor.idMedidor, fechaLectura }); // Para lecturaAnterior y numeroRecibo
    const lecturaAnterior = ultimaLectura ? ultimaLectura.lecturaActual: 0;

    logger.info(`lecturaAnterior:${lecturaAnterior}`);

    const m3Consumido = this.calcularM3Consumido(lecturaActual, lecturaAnterior);

    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE); // Para idTarifa y montoPagar

    if (!tarifa) {
      throw new Error('Tarifa para calcular monto a pagar no esta registrado');
    }

    const montoPagar = this.calcularMontoPagar(m3Consumido, tarifa);

    const ultimoResultado = await lecturaRepositorio.obtenerUltimoLecturaRegistrado();

    if (ultimoResultado && ultimoResultado.length > 0) {
      ultimaLectura = ultimoResultado[0];
    } else {
      ultimaLectura = null;
    }

    const numeroRecibo = this.generarNumeroRecibo(medidor.idMedidor, medidor.idUsuario, ultimaLectura);

    const fechaLimitePago = this.calcularFechaLimitePago();

    const lectura = new LecturaModelo({
      idMedidor: medidor.idMedidor,
      lecturaActual,
      lecturaAnterior,
      m3Consumido,
      idTarifa: tarifa.idTarifa,
      montoPagar,
      numeroRecibo,
      fechaLimitePago: this.formateoFechaYMD(fechaLimitePago),
      fechaLectura
    });

    return lectura;
  }

  async obtenerRecibo(idLectura) {
    const lectura = await lecturaRepositorio.obtenerLecturaPorIdLectura(idLectura);
    const medidor = await medidorRepositorio.obtenerMedidorPorIdMedidor(lectura.idMedidor);
    const usuario = await usuarioRepositorio.obtenerUsuarioPorId(medidor.idUsuario);
    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE);

    const recibo = new ReciboModelo({
      idLectura: lectura.idLectura, 
      idMedidor: medidor.idMedidor,
      codigoMedidor: medidor.codigoMedidor,
      lecturaActual: lectura.lecturaActual,
      lecturaAnterior: lectura.lecturaAnterior,            
      m3Consumido: lectura.m3Consumido,
      montoPagar: lectura.montoPagar,
      numeroRecibo: lectura.numeroRecibo,
      fechaLimitePago: lectura.fechaLimitePago,
      fechaLectura: lectura.fechaLectura,
      comentario: lectura.comentario,
      estado: lectura.estado,
      usuario: `${usuario.nombres} ${usuario.paterno} ${usuario.materno}`,
      direccion: usuario.direccion,
      deudaAnterior: 0,
      deudaActual: lectura.montoPagar,
      tarifa: tarifa.montoTarifa,
      m3Tarifa: tarifa.m3Consumo
    });

    return recibo;
  }

};

export default new LecturaServicio();

