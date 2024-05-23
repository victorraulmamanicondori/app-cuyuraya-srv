import pool from '../config/db.js';
import logger from '../config/logger.js';
import RubroModelo from '../modelos/RubroModelo.js';

class RubroRepositorio {

  async obtenerPorTipoRubroEstado(tipoRubro, estado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_RUBRO WHERE TIPO_RUBRO = ? AND ESTADO = ?", [tipoRubro, estado]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new RubroModelo(fila.ID_RUBRO,
                       fila.TIPO_RUBRO,
                       fila.ESTADO,
                       fila.FEC_CREACION,
                       fila.FEC_ACTUALIZACION);
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

