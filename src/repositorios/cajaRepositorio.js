import pool from '../config/db.js';
import logger from '../config/logger.js';
import CajaModelo from '../modelos/CajaModelo.js';

class CajaRepositorio {

  async registrarCaja({ numeroComprobante, idTipoMovimiento, fechaMovimiento, descripcion, monto, idPagoRecibo, estado }) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_CAJA (NUM_COMPROBANTE,
                                                                    ID_TIPO_MOV,
                                                                    FECHA_MOVIMIENTO,
                                                                    DESCRIPCION,
                                                                    MONTO,
                                                                    ID_PAGO_RECIBO,
                                                                    ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                                     [numeroComprobante,
                                                      idTipoMovimiento,
                                                      fechaMovimiento,
                                                      descripcion,
                                                      monto,
                                                      idPagoRecibo,
                                                      estado]);
      return resultado.insertId.toString();
    } catch(error) {
      logger.error(`Error al crear usuario:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new CajaRepositorio();

