/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import logger from '../config/logger.js';
import TipoMovimientoModelo from '../modelos/TipoMovimientoModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class TipoMovimientoRepositorio {

  async listarPorRubroEstado(idRubro, estado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_TIPO_MOVIMIENTO WHERE ID_RUBRO = ? AND ESTADO = ?", [toNullIfUndefined(idRubro), toNullIfUndefined(estado)]);
      return filas.map(fila => new TipoMovimientoModelo({ idTipoMovimiento: fila.ID_TIPO_MOV,
                                                          concepto: fila.CONCEPTO,
                                                          idRubro: fila.ID_RUBRO,
                                                          estado: fila.ESTADO,
                                                          fecCreacion: fila.FEC_CREACION,
                                                          fecActualizacion: fila.FEC_ACTUALIZACION
                                                        }));
    } catch(error) {
      logger.error(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new TipoMovimientoRepositorio();

