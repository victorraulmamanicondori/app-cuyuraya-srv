import pool from '../config/db.js';
import logger from '../config/logger.js';
import LecturaModelo from '../modelos/LecturaModelo.js';
import { LecturaEstados } from '../constantes/estados.js';

class LecturaRepositorio {
  async listarLecturas() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_LECTURA ORDER BY FEC_CREACION DESC");
      return filas.map(fila => new LecturaModelo(
                                    fila.ID_LECTURA.toString(),
                                    fila.ID_MEDIDOR.toString(),
                                    fila.LECTURA_ACTUAL.toString(),
                                    fila.LECTURA_ANTERIOR.toString(),
                                    fila.M3_CONSUMIDO,
                                    fila.ID_TARIFA.toString(),
                                    fila.MONTO_PAGAR,
                                    fila.PORC_DESCUENTO,
                                    fila.MONTO_MULTA,
                                    fila.NUM_RECIBO,
                                    fila.FECHA_LIMT_PAGO,
                                    fila.FECHA_CORTE,
                                    fila.COMENTARIO,
                                    fila.ESTADO,
                                    fila.FEC_CREACION,
                                    fila.FEC_ACTUALIZACION));
    } catch(error) {
      logger.error(`Error al listar lecturas:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerLecturaAnterior({ idMedidor }) {
    let conexion;
    try {
      logger.info(`LecturaRepositorio:obtenerLecturaAnterior: idMedidor=${idMedidor}`);

      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_LECTURA WHERE ID_MEDIDOR = ? ORDER BY FEC_CREACION DESC LIMIT 1", [idMedidor]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new LecturaModelo(
            fila.ID_LECTURA.toString(),
            fila.ID_MEDIDOR.toString(),
            fila.LECTURA_ACTUAL.toString(),
            fila.LECTURA_ANTERIOR.toString(),
            fila.M3_CONSUMIDO,
            fila.ID_TARIFA.toString(),
            fila.MONTO_PAGAR,
            fila.PORC_DESCUENTO,
            fila.MONTO_MULTA,
            fila.NUM_RECIBO,
            fila.FECHA_LIMT_PAGO,
            fila.FECHA_CORTE,
            fila.COMENTARIO,
            fila.ESTADO,
            fila.FEC_CREACION,
            fila.FEC_ACTUALIZACION);
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener lectura anterior: ${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async registrarLectura({idMedidor, lecturaActual, lecturaAnterior, m3Consumido, idTarifa, montoPagar, numeroRecibo, fechaLimitePago, estado}) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_LECTURA(ID_MEDIDOR,
                                                                       LECTURA_ACTUAL,
                                                                       LECTURA_ANTERIOR,
                                                                       M3_CONSUMIDO,
                                                                       ID_TARIFA,
                                                                       MONTO_PAGAR,
                                                                       NUM_RECIBO,
                                                                       FECHA_LIMT_PAGO,
                                                                       ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                     [idMedidor,
                                                      lecturaActual,
                                                      lecturaAnterior,
                                                      m3Consumido,
                                                      idTarifa,
                                                      montoPagar,
                                                      numeroRecibo,
                                                      fechaLimitePago,
                                                      estado]);
      const idLectura = resultado.insertId.toString();
      return idLectura;
    } catch(error) {
      logger.error(`Error al registrar lectura:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new LecturaRepositorio();

