import pool from '../config/db.js';
import logger from '../config/logger.js';
import MedidorModelo from '../modelos/MedidorModelo.js';
import { MedidorEstados } from '../constantes/estados.js';

class MedidorRepositorio {

  async obtenerMedidorPorCodigo(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_MEDIDOR WHERE COD_MEDIDOR = ?", [codigoMedidor]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new MedidorModelo(fila.ID_MEDIDOR.toString(),
                           fila.COD_MEDIDOR,
                           fila.ID_USUARIO.toString(),
                           fila.ESTADO,
                           fila.FEC_CREACION,
                           fila.FEC_ACTUALIZACION);
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener medidor por codigo ${codigoMedidor}: ${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async asignarMedidor(codigoMedidor, idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_MEDIDOR(COD_MEDIDOR,
                                                                      ID_USUARIO,
                                                                      ESTADO)
                                              VALUES (?, ?, ?)`,
                                                     [codigoMedidor,
                                                      idUsuario,
                                                      MedidorEstados.ASIGNADO]);
      const codigoAsignacion = resultado.insertId.toString();
      return codigoAsignacion;
    } catch(error) {
      logger.error(`Error al asignar medidor:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new MedidorRepositorio();

