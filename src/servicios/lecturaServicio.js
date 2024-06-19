import logger from '../config/logger.js';
import lecturaRepositorio from '../repositorios/lecturaRepositorio.js';
import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import tarifaRepositorio from '../repositorios/tarifaRepositorio.js';
import { LecturaEstados } from '../constantes/estados.js';
import { TarifaCodigos } from '../constantes/tarifas.js';

class LecturaServicio {

  calcularM3Consumido(lecturaActual, lecturaAnterior) {
    if (lecturaAnterior && lecturaActual) {
      return lecturaActual - lecturaAnterior;
    }
    return lecturaActual;
  }

  calcularMontoPagar(m3Consumido, montoTarifa) {
    return 0;
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

  async registrarLectura({ codigoMedidor, lecturaActual }) {
    logger.info(`codigoMedidor:${codigoMedidor}, lectura:${lecturaActual}`);
    
    const medidor = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor); // Para idMedidor y numeroRecibo

    if (!medidor) {
      throw new Error('Codigo del medidor no existe, ingrese codigo valido');
    }

    logger.info(`idMedidor:${medidor.idMedidor}`);

    const ultimaLectura = await lecturaRepositorio.obtenerLecturaAnterior({ idMedidor: medidor.idMedidor }); // Para lecturaAnterior y numeroRecibo
    const lecturaAnterior = ultimaLectura ? ultimaLectura.lecturaActual: 0;

    logger.info(`lecturaAnterior:${lecturaAnterior}`);

    const m3Consumido = this.calcularM3Consumido(lecturaActual, lecturaAnterior);

    const tarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(TarifaCodigos.BASE); // Para idTarifa y montoPagar

    if (!tarifa) {
      throw new Error('Tarifa para calcular monto a pagar no esta registrado');
    }

    const montoPagar = this.calcularMontoPagar(m3Consumido, tarifa.montoTarifa);

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
      estado: LecturaEstados.REGISTRADO
    });

    if (!idLectura) {
      throw new Error('No se pudo registrar lectura, intente nuevamente');
    }

    return { idLectura };
  }

};

export default new LecturaServicio();

