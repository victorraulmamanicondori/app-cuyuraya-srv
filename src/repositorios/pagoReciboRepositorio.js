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

class PagoReciboRepositorio {

  async registrarPagoRecibo({ fechaPago, montoPago, idLectura, numeroComprobante, comentario, estado }) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_PAGO_RECIBO (FECHA_PAGO,
                                                                    MONTO_PAGO,
                                                                    ID_LECTURA,
                                                                    NUM_COMPROBANTE,
                                                                    COMENTARIO,
                                                                    ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?)`,
                                                     [toNullIfUndefined(fechaPago),
                                                      toNullIfUndefined(montoPago),
                                                      toNullIfUndefined(idLectura),
                                                      toNullIfUndefined(numeroComprobante),
                                                      toNullIfUndefined(comentario),
                                                      toNullIfUndefined(estado)]);
      return resultado.insertId;
    } catch(error) {
      logger.error(`Error al registrar pago de recibo:${error}`);
      throw new Error(`Error al registrar pago de recibo`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new PagoReciboRepositorio();

