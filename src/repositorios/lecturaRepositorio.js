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
      return filas.map(fila => new LecturaModelo({
                                    idLectura: fila.ID_LECTURA.toString(),
                                    idMedidor: fila.ID_MEDIDOR.toString(),
                                    lecturaActual: fila.LECTURA_ACTUAL.toString(),
                                    lecturaAnterior: fila.LECTURA_ANTERIOR.toString(),
                                    m3Consumido: fila.M3_CONSUMIDO,
                                    idTarifa: fila.ID_TARIFA.toString(),
                                    montoPagar: fila.MONTO_PAGAR,
                                    porcDescuento: fila.PORC_DESCUENTO,
                                    montoMulta: fila.MONTO_MULTA,
                                    numRecibo: fila.NUM_RECIBO,
                                    fechaLimtPago: fila.FECHA_LIMT_PAGO,
                                    fechaCorte: fila.FECHA_CORTE,
                                    fechaLectura: fila.FECHA_LECTURA,
                                    comentario: fila.COMENTARIO,
                                    estado: fila.ESTADO,
                                    fecCreacion: fila.FEC_CREACION,
                                    fecActualizacion: fila.FEC_ACTUALIZACION
                                  }));
    } catch(error) {
      logger.error(`Error al listar lecturas:${error}`);
      throw new Error(error.message);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerLecturasPorMedidor(page = 1, limit = 1, idMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();

      const offset = (page - 1) * limit;

      const filas = await conexion.query(
        `SELECT * FROM TBL_LECTURA WHERE ID_MEDIDOR = ? AND ESTADO <> ? ORDER BY FECHA_LECTURA DESC LIMIT ? OFFSET ?`,
        [idMedidor, LecturaEstados.ANULADO, limit, offset]
      );

      const resultados = filas.map(fila => new LecturaModelo({
        idLectura: fila.ID_LECTURA.toString(),
        idMedidor: fila.ID_MEDIDOR.toString(),
        lecturaActual: fila.LECTURA_ACTUAL.toString(),
        lecturaAnterior: fila.LECTURA_ANTERIOR.toString(),
        m3Consumido: fila.M3_CONSUMIDO,
        idTarifa: fila.ID_TARIFA.toString(),
        montoPagar: fila.MONTO_PAGAR,
        porcDescuento: fila.PORC_DESCUENTO,
        montoMulta: fila.MONTO_MULTA,
        numRecibo: fila.NUM_RECIBO,
        fechaLimtPago: fila.FECHA_LIMT_PAGO,
        fechaCorte: fila.FECHA_CORTE,
        fechaLectura: fila.FECHA_LECTURA,
        comentario: fila.COMENTARIO,
        estado: fila.ESTADO,
        fecCreacion: fila.FEC_CREACION,
        fecActualizacion: fila.FEC_ACTUALIZACION
      }));

      // Consulta para contar el total de registros
      const [{ total }] = await conexion.query(`SELECT COUNT(*) AS total FROM TBL_LECTURA WHERE ID_MEDIDOR = ? AND  ESTADO <> ?`, [idMedidor, LecturaEstados.ANULADO]);

      return {
        resultados,
        total: Number(total),
        page,
        limit,
      };
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
      const filas = await conexion.query("SELECT ID_LECTURA, LECTURA_ACTUAL FROM TBL_LECTURA WHERE ID_MEDIDOR = ? AND ESTADO <> ? ORDER BY FECHA_LECTURA DESC LIMIT 1", [idMedidor, LecturaEstados.ANULADO]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new LecturaModelo({
            idLectura: fila.ID_LECTURA.toString(),
            lecturaActual: fila.LECTURA_ACTUAL.toString()
          });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener lectura anterior: ${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async registrarLectura({ idMedidor, lecturaActual, lecturaAnterior, 
                           m3Consumido, idTarifa, montoPagar, 
                           numeroRecibo, fechaLimitePago, fechaLectura, estado }) {
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
                                                                       FECHA_LECTURA,
                                                                       ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                     [idMedidor,
                                                      lecturaActual,
                                                      lecturaAnterior,
                                                      m3Consumido,
                                                      idTarifa,
                                                      montoPagar,
                                                      numeroRecibo,
                                                      fechaLimitePago,
                                                      fechaLectura,
                                                      estado]);
      const idLectura = resultado.insertId.toString();
      return idLectura;
    } catch(error) {
      logger.error(`Error al registrar lectura:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerLecturasPorCodigoMedidor(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query(`
        SELECT TL.M3_CONSUMIDO, DATE_FORMAT(TL.FEC_CREACION, '%Y-%m-%d %H:%i:%s') AS FEC_CREACION
        FROM TBL_LECTURA TL
        INNER JOIN TBL_MEDIDOR TM ON TM.ID_MEDIDOR = TL.ID_MEDIDOR
        WHERE TM.COD_MEDIDOR = ?
        ORDER BY TL.FEC_CREACION DESC LIMIT 10`, [codigoMedidor]);
      return filas.map(fila => ({ "value": fila.M3_CONSUMIDO, "date": fila.FEC_CREACION }));
    } catch(error) {
      logger.error(`Error al listar lecturas por codigoMedidor:${error}`);
      throw new Error('Error al listar lecturas por codigoMedidor');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new LecturaRepositorio();

