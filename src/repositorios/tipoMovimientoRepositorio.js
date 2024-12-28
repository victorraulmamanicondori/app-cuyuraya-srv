import pool from '../config/db.js';
import logger from '../config/logger.js';
import TipoMovimientoModelo from '../modelos/TipoMovimientoModelo.js';

class TipoMovimientoRepositorio {

  async listarPorRubroEstado(idRubro, estado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_TIPO_MOVIMIENTO WHERE ID_RUBRO = ? AND ESTADO = ?", [idRubro, estado]);
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

