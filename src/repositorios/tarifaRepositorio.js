import pool from '../config/db.js';
import logger from '../config/logger.js';
import TarifaModelo from '../modelos/TarifaModelo.js';

class TarifaRepositorio {

  async obtenerTarifaPorCodigo(codigoTarifa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_TARIFA WHERE COD_TARIFA = ?", [codigoTarifa]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new TarifaModelo(fila.ID_TARIFA.toString(),
                           fila.COD_TARIFA,
                           fila.DESCRIPCION,
                           fila.MONTO_TARIFA,
                           fila.ESTADO,
                           fila.FEC_CREACION,
                           fila.FEC_ACTUALIZACION);
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener tarifa por codigo:${codigoTarifa}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new TarifaRepositorio();

