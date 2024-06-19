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
                                    comentario: fila.COMENTARIO,
                                    estado: fila.ESTADO,
                                    fecCreacion: fila.FEC_CREACION,
                                    fecActualizacion: fila.FEC_ACTUALIZACION
                                  }));
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
      const filas = await conexion.query("SELECT ID_LECTURA, LECTURA_ACTUAL FROM TBL_LECTURA WHERE ID_MEDIDOR = ? ORDER BY FEC_CREACION DESC LIMIT 1", [idMedidor]);
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
                           numeroRecibo, fechaLimitePago, estado }) {
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

  async obtenerLecturasPorCodigoMedidor(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query(`SELECT TL.M3_CONSUMIDO, TL.FEC_CREACION FROM TBL_LECTURA TL 
                            INNER JOIN TBL_MEDIDOR TM ON TM.ID_MEDIDOR = TL.ID_MEDIDOR
                            WHERE TM.COD_MEDIDOR = ?
                            ORDER BY FEC_CREACION DESC LIMIT 10`, [codigoMedidor]);
      return filas.map(fila => ({ "value": fila.M3_CONSUMIDO, "date": fila.FEC_CREACION.toISOString() }));
    } catch(error) {
      logger.error(`Error al listar lecturas por codigoMedidor:${error}`);
      throw new Error('Error al listar lecturas por codigoMedidor');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new LecturaRepositorio();

