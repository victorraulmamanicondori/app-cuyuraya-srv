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

