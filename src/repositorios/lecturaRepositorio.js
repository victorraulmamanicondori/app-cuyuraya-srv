import pool from '../config/db.js';
import logger from '../config/logger.js';
import LecturaModelo from '../modelos/LecturaModelo.js';
import { LecturaEstados } from '../constantes/estados.js';
import { toNullIfUndefined } from '../constantes/util.js';

class LecturaRepositorio {

  async listarLecturas() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT 
        ID_LECTURA,
        ID_MEDIDOR,
        LECTURA_ACTUAL,
        LECTURA_ANTERIOR,
        M3_CONSUMIDO,
        ID_TARIFA,
        MONTO_PAGAR,
        PORC_DESCUENTO,
        MONTO_MULTA,
        NUM_RECIBO,
        DATE_FORMAT(L.FECHA_LIMT_PAGO, '%Y-%m-%d') as FECHA_LIMT_PAGO,
        DATE_FORMAT(L.FECHA_CORTE, '%Y-%m-%d') as FECHA_CORTE,
        DATE_FORMAT(L.FECHA_LECTURA, '%Y-%m-%d') as FECHA_LECTURA,
        COMENTARIO,
        ESTADO,
        FEC_CREACION,
        FEC_ACTUALIZACION
      FROM TBL_LECTURA L ORDER BY FEC_CREACION DESC`);
      return filas.map(fila => new LecturaModelo({
                                    idLectura: fila.ID_LECTURA,
                                    idMedidor: fila.ID_MEDIDOR,
                                    lecturaActual: fila.LECTURA_ACTUAL,
                                    lecturaAnterior: fila.LECTURA_ANTERIOR,
                                    m3Consumido: fila.M3_CONSUMIDO,
                                    idTarifa: fila.ID_TARIFA,
                                    montoPagar: fila.MONTO_PAGAR,
                                    porcDescuento: fila.PORC_DESCUENTO,
                                    montoMulta: fila.MONTO_MULTA,
                                    numeroRecibo: fila.NUM_RECIBO,
                                    fechaLimitePago: fila.FECHA_LIMT_PAGO,
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

  async obtenerUltimoLecturaRegistrado() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT 
        ID_LECTURA,
        ID_MEDIDOR,
        LECTURA_ACTUAL,
        LECTURA_ANTERIOR,
        M3_CONSUMIDO,
        ID_TARIFA,
        MONTO_PAGAR,
        PORC_DESCUENTO,
        MONTO_MULTA,
        NUM_RECIBO,
        DATE_FORMAT(L.FECHA_LIMT_PAGO, '%Y-%m-%d') as FECHA_LIMT_PAGO,
        DATE_FORMAT(L.FECHA_CORTE, '%Y-%m-%d') as FECHA_CORTE,
        DATE_FORMAT(L.FECHA_LECTURA, '%Y-%m-%d') as FECHA_LECTURA,
        COMENTARIO,
        ESTADO,
        FEC_CREACION,
        FEC_ACTUALIZACION
      FROM TBL_LECTURA L ORDER BY FEC_CREACION DESC LIMIT 1`);
      return filas.map(fila => new LecturaModelo({
                                    idLectura: fila.ID_LECTURA,
                                    idMedidor: fila.ID_MEDIDOR,
                                    lecturaActual: fila.LECTURA_ACTUAL,
                                    lecturaAnterior: fila.LECTURA_ANTERIOR,
                                    m3Consumido: fila.M3_CONSUMIDO,
                                    idTarifa: fila.ID_TARIFA,
                                    montoPagar: fila.MONTO_PAGAR,
                                    porcDescuento: fila.PORC_DESCUENTO,
                                    montoMulta: fila.MONTO_MULTA,
                                    numeroRecibo: fila.NUM_RECIBO,
                                    fechaLimitePago: fila.FECHA_LIMT_PAGO,
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

  async obtenerLecturaPorIdLectura(idLectura) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [fila] = await conexion.execute(`SELECT 
        ID_LECTURA,
        ID_MEDIDOR,
        LECTURA_ACTUAL,
        LECTURA_ANTERIOR,
        M3_CONSUMIDO,
        ID_TARIFA,
        MONTO_PAGAR,
        PORC_DESCUENTO,
        MONTO_MULTA,
        NUM_RECIBO,
        DATE_FORMAT(L.FECHA_LIMT_PAGO, '%Y-%m-%d') as FECHA_LIMT_PAGO,
        DATE_FORMAT(L.FECHA_CORTE, '%Y-%m-%d') as FECHA_CORTE,
        DATE_FORMAT(L.FECHA_LECTURA, '%Y-%m-%d') as FECHA_LECTURA,
        COMENTARIO,
        ESTADO,
        FEC_CREACION,
        FEC_ACTUALIZACION
      FROM TBL_LECTURA L WHERE ID_LECTURA = ? AND ESTADO <> ?`, [idLectura, LecturaEstados.ANULADO]);

      if (fila && fila.length > 0) {
        return new LecturaModelo({
          idLectura: fila[0].ID_LECTURA,
          idMedidor: fila[0].ID_MEDIDOR,
          lecturaActual: fila[0].LECTURA_ACTUAL,
          lecturaAnterior: fila[0].LECTURA_ANTERIOR,
          m3Consumido: fila[0].M3_CONSUMIDO,
          idTarifa: fila[0].ID_TARIFA,
          montoPagar: fila[0].MONTO_PAGAR,
          porcDescuento: fila[0].PORC_DESCUENTO,
          montoMulta: fila[0].MONTO_MULTA,
          numeroRecibo: fila[0].NUM_RECIBO,
          fechaLimitePago: fila[0].FECHA_LIMT_PAGO,
          fechaCorte: fila[0].FECHA_CORTE,
          fechaLectura: fila[0].FECHA_LECTURA,
          comentario: fila[0].COMENTARIO,
          estado: fila[0].ESTADO,
          fecCreacion: fila[0].FEC_CREACION,
          fecActualizacion: fila[0].FEC_ACTUALIZACION
        });
      } else {
        return null;
      }
    } catch(error) {
      logger.error(`Error al obtener lectura para id=${idLectura}:${error}`);
      throw new Error(error.message);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerLecturasPorMedidor({idMedidor, page = 1, limit = 1}) {
    let conexion;
    try {
      conexion = await pool.getConnection();

      const offset = (page - 1) * limit;

      const [filas] = await conexion.execute(
        `SELECT 
          ID_LECTURA,
          ID_MEDIDOR,
          LECTURA_ACTUAL,
          LECTURA_ANTERIOR,
          M3_CONSUMIDO,
          ID_TARIFA,
          MONTO_PAGAR,
          PORC_DESCUENTO,
          MONTO_MULTA,
          NUM_RECIBO,
          DATE_FORMAT(L.FECHA_LIMT_PAGO, '%Y-%m-%d') as FECHA_LIMT_PAGO,
          DATE_FORMAT(L.FECHA_CORTE, '%Y-%m-%d') as FECHA_CORTE,
          DATE_FORMAT(L.FECHA_LECTURA, '%Y-%m-%d') as FECHA_LECTURA,
          COMENTARIO,
          ESTADO,
          FEC_CREACION,
          FEC_ACTUALIZACION 
        FROM TBL_LECTURA L WHERE ID_MEDIDOR = ? AND ESTADO <> ? ORDER BY FECHA_LECTURA DESC LIMIT ? OFFSET ?`,
        [idMedidor, LecturaEstados.ANULADO, limit, offset]
      );

      const resultados = filas.map(fila => new LecturaModelo({
        idLectura: fila.ID_LECTURA,
        idMedidor: fila.ID_MEDIDOR,
        lecturaActual: fila.LECTURA_ACTUAL,
        lecturaAnterior: fila.LECTURA_ANTERIOR,
        m3Consumido: fila.M3_CONSUMIDO,
        idTarifa: fila.ID_TARIFA,
        montoPagar: fila.MONTO_PAGAR,
        porcDescuento: fila.PORC_DESCUENTO,
        montoMulta: fila.MONTO_MULTA,
        numeroRecibo: fila.NUM_RECIBO,
        fechaLimitePago: fila.FECHA_LIMT_PAGO,
        fechaCorte: fila.FECHA_CORTE,
        fechaLectura: fila.FECHA_LECTURA,
        comentario: fila.COMENTARIO,
        estado: fila.ESTADO,
        fecCreacion: fila.FEC_CREACION,
        fecActualizacion: fila.FEC_ACTUALIZACION
      }));

      // Consulta para contar el total de registros
      const [{ total }] = await conexion.execute(`SELECT COUNT(*) AS total FROM TBL_LECTURA WHERE ID_MEDIDOR = ? AND  ESTADO <> ?`, [idMedidor, LecturaEstados.ANULADO]);

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

  async obtenerLecturaAnterior({ idMedidor, fechaLectura }) {
    let conexion;
    try {
      logger.info(`obtenerLecturaAnterior: idMedidor=${idMedidor}, fechaLectura=${fechaLectura}`);

      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT ID_LECTURA, LECTURA_ACTUAL FROM TBL_LECTURA WHERE ID_MEDIDOR = ? AND ESTADO <> ? AND FECHA_LECTURA < ? ORDER BY FECHA_LECTURA DESC LIMIT 1`, [idMedidor, LecturaEstados.ANULADO, fechaLectura]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new LecturaModelo({
            idLectura: fila.ID_LECTURA,
            lecturaActual: fila.LECTURA_ACTUAL
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
      const [resultado] = await conexion.execute(`INSERT INTO TBL_LECTURA(ID_MEDIDOR,
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
                                                      toNullIfUndefined(lecturaAnterior),
                                                      m3Consumido,
                                                      idTarifa,
                                                      montoPagar,
                                                      numeroRecibo,
                                                      fechaLimitePago,
                                                      fechaLectura,
                                                      estado]);
      const idLectura = resultado.insertId;
      return idLectura;
    } catch(error) {
      logger.error(`Error al registrar lectura:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarLectura({ idLectura, idMedidor, lecturaActual, lecturaAnterior, 
                           m3Consumido, idTarifa, montoPagar, 
                           numeroRecibo, fechaLimitePago, fechaLectura, estado }) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_LECTURA SET
                                                ID_MEDIDOR = ?,
                                                LECTURA_ACTUAL = ?,
                                                LECTURA_ANTERIOR = ?,
                                                M3_CONSUMIDO = ?,
                                                ID_TARIFA = ?,
                                                MONTO_PAGAR = ?,
                                                NUM_RECIBO = ?,
                                                FECHA_LIMT_PAGO = ?,
                                                FECHA_LECTURA = ?,
                                                ESTADO = ?
                                              WHERE ID_LECTURA = ?`,
                                  [ idMedidor,
                                    lecturaActual,
                                    toNullIfUndefined(lecturaAnterior),
                                    m3Consumido,
                                    idTarifa,
                                    montoPagar,
                                    numeroRecibo,
                                    fechaLimitePago,
                                    fechaLectura,
                                    estado,
                                    idLectura
                                  ]);
      return idLectura;
    } catch(error) {
      logger.error(`Error al actualizar lectura:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerLecturasPorCodigoMedidor(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`
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

  async anularLectura(idLectura) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_LECTURA SET ESTADO = ? WHERE ID_LECTURA = ?`, [LecturaEstados.ANULADO, idLectura]);
      return { "idLectura": idLectura, "estado": LecturaEstados.ANULADO };
    } catch(error) {
      logger.error(`Error al actualizar lectura por idLectura:${error}`);
      throw new Error('Error al actualizar lectura por idLectura');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new LecturaRepositorio();

