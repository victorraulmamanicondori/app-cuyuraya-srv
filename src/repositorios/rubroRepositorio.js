/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import logger from '../config/logger.js';
import RubroModelo from '../modelos/RubroModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class RubroRepositorio {

  async obtenerPorTipoRubroEstado(tipoRubro, estado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_RUBRO WHERE TIPO_RUBRO = ? AND ESTADO = ?", 
        [toNullIfUndefined(tipoRubro), toNullIfUndefined(estado)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new RubroModelo({
                      idRubro: fila.ID_RUBRO,
                      tipoRubro: fila.TIPO_RUBRO,
                      estado: fila.ESTADO,
                      fecCreacion: fila.FEC_CREACION,
                      fecActualizacion: fila.FEC_ACTUALIZACION
                    });
      }
      return null;
    } catch(error) {
      logger.error(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new RubroRepositorio();

