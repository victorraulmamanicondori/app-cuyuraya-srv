import logger from '../config/logger.js';
import lecturaRepositorio from '../repositorios/lecturaRepositorio.js';
import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import tarifaRepositorio from '../repositorios/tarifaRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import { LecturaEstados } from '../constantes/estados.js';
import { TarifaCodigos } from '../constantes/tarifas.js';

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

  async registrarLectura({ codigoMedidor, lecturaActual, dni, fechaLectura }) {
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

    const ultimaLectura = await lecturaRepositorio.obtenerLecturaAnterior({ idMedidor: medidor.idMedidor }); // Para lecturaAnterior y numeroRecibo
    const lecturaAnterior = ultimaLectura ? ultimaLectura.lecturaActual: 0;

    logger.info(`lecturaAnterior:${lecturaAnterior}`);

    const m3Consumido = this.calcularM3Consumido(lecturaActual, lecturaAnterior);

    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE); // Para idTarifa y montoPagar

    if (!tarifa) {
      throw new Error('Tarifa para calcular monto a pagar no esta registrado');
    }

    const montoPagar = this.calcularMontoPagar(m3Consumido, tarifa);

    const numeroRecibo = this.generarNumeroRecibo(medidor.idMedidor, medidor.idUsuario, ultimaLectura);

    const fechaLimitePago = this.calcularFechaLimitePago();

    const idLectura = await lecturaRepositorio.registrarLectura({
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

    if (!idLectura) {
      throw new Error('No se pudo registrar lectura, intente nuevamente');
    }

    return { idLectura };
  }

  async obtenerLecturasPorMedidor(page, limit, idMedidor) {

    if (!idMedidor) {
      throw new Error('Id del medidor es requerido');
    }

    return lecturaRepositorio.obtenerLecturasPorMedidor(page, limit, idMedidor);
  }

};

export default new LecturaServicio();

