import pool from '../config/db.js';
import logger from '../config/logger.js';
import {MedidorEstados} from '../constantes/estados.js';
import MedidorModelo from '../modelos/MedidorModelo.js';

class MedidorRepositorio {

  async obtenerMedidorPorCodigo(codigoMedidor) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_MEDIDOR WHERE COD_MEDIDOR = ?", [codigoMedidor]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new MedidorModelo({ 
                          idMedidor: fila.ID_MEDIDOR.toString(),
                          codMedidor: fila.COD_MEDIDOR,
                          idUsuario: fila.ID_USUARIO.toString(),
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

  async obtenerMedidorPorIdUsuario(idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_MEDIDOR WHERE ID_USUARIO = ?", [idUsuario]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new MedidorModelo({ 
                          idMedidor: fila.ID_MEDIDOR.toString(),
                          codMedidor: fila.COD_MEDIDOR,
                          idUsuario: fila.ID_USUARIO.toString(),
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

  async actualizarAsignacionMedidor(idMedidor, codigoMedidor, idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`UPDATE TBL_MEDIDOR SET COD_MEDIDOR = ?, ID_USUARIO = ?
                                              WHERE ID_MEDIDOR = ?`,
                                                     [codigoMedidor,
                                                      idUsuario,
                                                      idMedidor]);
      const codigoAsignacion = idMedidor;
      return codigoAsignacion;
    } catch(error) {
      logger.error(`Error al asignar medidor:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new MedidorRepositorio();

