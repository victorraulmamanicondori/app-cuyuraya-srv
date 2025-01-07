import pool from '../config/db.js';
import logger from '../config/logger.js';
import {MedidorEstados} from '../constantes/estados.js';
import MedidorModelo from '../modelos/MedidorModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class MedidorRepositorio {

  async obtenerMedidorPorCodigo(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_MEDIDOR WHERE COD_MEDIDOR = ?", [toNullIfUndefined(codigoMedidor)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new MedidorModelo({ 
                          idMedidor: fila.ID_MEDIDOR,
                          codigoMedidor: fila.COD_MEDIDOR,
                          idUsuario: fila.ID_USUARIO,
                          estado: fila.ESTADO,
                          fecCreacion: fila.FEC_CREACION,
                          fecActualizacion: fila.FEC_ACTUALIZACION
                        });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener medidor por codigo ${codigoMedidor}: ${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerMedidorPorIdMedidor(idMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_MEDIDOR WHERE ID_MEDIDOR = ?", [toNullIfUndefined(idMedidor)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new MedidorModelo({ 
                          idMedidor: fila.ID_MEDIDOR,
                          codigoMedidor: fila.COD_MEDIDOR,
                          idUsuario: fila.ID_USUARIO,
                          estado: fila.ESTADO,
                          fecCreacion: fila.FEC_CREACION,
                          fecActualizacion: fila.FEC_ACTUALIZACION
                        });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener medidor por id ${idMedidor}: ${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerMedidorPorIdUsuario(idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_MEDIDOR WHERE ID_USUARIO = ?", [toNullIfUndefined(idUsuario)]);
      if (filas.length > 0) {
        return filas.map(fila => new MedidorModelo({ 
                          idMedidor: fila.ID_MEDIDOR,
                          codigoMedidor: fila.COD_MEDIDOR,
                          idUsuario: fila.ID_USUARIO,
                          estado: fila.ESTADO,
                          fecCreacion: fila.FEC_CREACION,
                          fecActualizacion: fila.FEC_ACTUALIZACION
                        }));
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
      const [resultado] = await conexion.execute(`INSERT INTO TBL_MEDIDOR(COD_MEDIDOR,
                                                                      ID_USUARIO,
                                                                      ESTADO)
                                              VALUES (?, ?, ?)`,
                                                     [toNullIfUndefined(codigoMedidor),
                                                      toNullIfUndefined(idUsuario),
                                                      MedidorEstados.ASIGNADO]);
      const codigoAsignacion = resultado.insertId;
      return codigoAsignacion;
    } catch(error) {
      logger.error(`Error al asignar medidor:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarAsignacionMedidor(idMedidor, codigoMedidor, idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`UPDATE TBL_MEDIDOR SET COD_MEDIDOR = ?, ID_USUARIO = ?
                                              WHERE ID_MEDIDOR = ?`,
                                                     [toNullIfUndefined(codigoMedidor),
                                                      toNullIfUndefined(idUsuario),
                                                      toNullIfUndefined(idMedidor)]);
      const codigoAsignacion = idMedidor;
      return codigoAsignacion;
    } catch(error) {
      logger.error(`Error al asignar medidor:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarAsignacionMedidor(codigoMedidor, idUsuario) {
    let conexion;

    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`DELETE FROM TBL_MEDIDOR WHERE COD_MEDIDOR = ? AND ID_USUARIO = ?`,
               [toNullIfUndefined(codigoMedidor), toNullIfUndefined(idUsuario)]);
      return resultado;
    } catch(error) {
      logger.error(`Error al desasignar medidor:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new MedidorRepositorio();

