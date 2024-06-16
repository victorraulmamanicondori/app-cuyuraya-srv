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
        return new TarifaModelo({
                          idTarifa: fila.ID_TARIFA.toString(),
                          codigoTarifa: fila.COD_TARIFA,
                          descripcion: fila.DESCRIPCION,
                          montoTarifa: fila.MONTO_TARIFA,
                          estado: fila.ESTADO,
                          fecCreacion: fila.FEC_CREACION,
                          fecActualizacion: fila.FEC_ACTUALIZACION
                        });
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

