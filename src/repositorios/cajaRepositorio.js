/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import logger from '../config/logger.js';
import { toNullIfUndefined } from '../constantes/util.js';
import CajaModelo from '../modelos/CajaModelo.js';

class CajaRepositorio {

  async registrarCaja({ numeroComprobante, idTipoMovimiento, fechaMovimiento, descripcion, monto, idPagoRecibo, estado }) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_CAJA (NUM_COMPROBANTE,
                                                                    ID_TIPO_MOV,
                                                                    FECHA_MOVIMIENTO,
                                                                    DESCRIPCION,
                                                                    MONTO,
                                                                    ID_PAGO_RECIBO,
                                                                    ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                                     [toNullIfUndefined(numeroComprobante),
                                                      toNullIfUndefined(idTipoMovimiento),
                                                      toNullIfUndefined(fechaMovimiento),
                                                      toNullIfUndefined(descripcion),
                                                      toNullIfUndefined(monto),
                                                      toNullIfUndefined(idPagoRecibo),
                                                      toNullIfUndefined(estado)]);
      return resultado.insertId;
    } catch(error) {
      logger.error(`Error al registrar en caja:${error}`);
      throw new Error('Error al registrar en caja');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async listarCajaPorRubro(tipoRubro) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT C.ID_CAJA, 
                                            C.NUM_COMPROBANTE,
                                            C.ID_TIPO_MOV,
                                            DATE_FORMAT(C.FECHA_MOVIMIENTO, '%d/%m/%Y') AS FECHA_MOVIMIENTO,
                                            C.DESCRIPCION,
                                            C.MONTO,
                                            C.ID_PAGO_RECIBO,
                                            C.ESTADO,
                                            M.CONCEPTO 
                                          FROM TBL_CAJA C 
                                          INNER JOIN 
                                          TBL_TIPO_MOVIMIENTO M 
                                          ON M.ID_TIPO_MOV = C.ID_TIPO_MOV
                                          INNER JOIN
                                          TBL_RUBRO R
                                          ON R.ID_RUBRO = M.ID_RUBRO
                                          WHERE R.TIPO_RUBRO = ?`, [toNullIfUndefined(tipoRubro)]);
      return filas.map(fila => new CajaModelo({ idCaja: fila.ID_CAJA, 
                                                numeroComprobante: fila.NUM_COMPROBANTE,
                                                idTipoMovimiento: fila.ID_TIPO_MOV,
                                                fechaMovimiento: fila.FECHA_MOVIMIENTO,
                                                descripcion: fila.DESCRIPCION,
                                                monto: fila.MONTO,
                                                idPagoRecibo: fila.ID_PAGO_RECIBO,
                                                estado: fila.ESTADO,
                                                concepto: fila.CONCEPTO
                                              }));
    } catch(error) {
      logger.error(`Error al listar en caja:${error}`);
      throw new Error('Error al listar en caja');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new CajaRepositorio();

