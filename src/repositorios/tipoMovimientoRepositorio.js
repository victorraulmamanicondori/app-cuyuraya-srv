import pool from '../config/db.js';
import logger from '../config/logger.js';
import TipoMovimientoModelo from '../modelos/TipoMovimientoModelo.js';

class TipoMovimientoRepositorio {

  async listarPorRubroEstado(idRubro, estado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_TIPO_MOVIMIENTO WHERE ID_RUBRO = ? AND ESTADO = ?", [idRubro, estado]);
      return filas.map(fila => new TipoMovimientoModelo(fila.ID_TIPO_MOV,
                                                        fila.CONCEPTO,
                                                        fila.ID_RUBRO,
                                                        fila.ESTADO,
                                                        fila.FEC_CREACION,
                                                        fila.FEC_ACTUALIZACION));
    } catch(error) {
      logger.error(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new TipoMovimientoRepositorio();

