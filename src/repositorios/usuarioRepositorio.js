import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import logger from '../config/logger.js';
import UsuarioModelo from '../modelos/UsuarioModelo.js';
import { UsuarioEstados } from '../constantes/estados.js';

class UsuarioRepositorio {
  async listarUsuarios() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_USUARIO ORDER BY PATERNO ASC");
      return filas.map(fila => new UsuarioModelo(
                                    fila.ID_USUARIO.toString(),
                                    fila.NOMBRES,
                                    fila.PATERNO,
                                    fila.MATERNO,
                                    fila.DNI,
                                    fila.DIRECCION,
                                    fila.NUM_CONTRATO,
                                    fila.TELEFONO,
                                    fila.CLAVE,
                                    fila.ID_ROL,
                                    fila.ESTADO,
                                    fila.FEC_CREACION,
                                    fila.FEC_ACTUALIZACION));
    } catch(error) {
      logger.error(`Error al listar usuarios:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerUsuarioPorDni(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_USUARIO WHERE DNI = ?", [dni]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new UsuarioModelo(fila.ID_USUARIO.toString(),
                           fila.NOMBRES,
                           fila.PATERNO,
                           fila.MATERNO,
                           fila.DNI,
                           fila.DIRECCION,
                           fila.NUM_CONTRATO,
                           fila.TELEFONO,
                           fila.CLAVE,
                           fila.ID_ROL,
                           fila.ESTADO,
                           fila.FEC_CREACION,
                           fila.FEC_ACTUALIZACION);
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener usuario por dni:${dni}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearUsuario(usuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_USUARIO (NOMBRES,
                                                                       PATERNO,
                                                                       MATERNO,
                                                                       DNI,
                                                                       DIRECCION,
                                                                       NUM_CONTRATO,
                                                                       TELEFONO,
                                                                       CLAVE,
                                                                       ID_ROL,
                                                                       ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                     [usuario.nombres,
                                                      usuario.paterno,
                                                      usuario.materno,
                                                      usuario.dni,
                                                      usuario.direccion,
                                                      usuario.numContrato,
                                                      usuario.telefono,
                                                      usuario.clave,
                                                      usuario.idRol,
                                                      usuario.estado]);
      usuario.id = resultado.insertId.toString();
      return usuario;
    } catch(error) {
      logger.error(`Error al crear usuario:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarUsuario(usuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_USUARIO 
                            SET NOMBRES = ?,
                                PATERNO = ?,
                                MATERNO = ?,
                                DIRECCION = ?,
                                NUM_CONTRATO = ?,
                                TELEFONO = ?,
                                ID_ROL = ?,
                                ESTADO = ?
                            WHERE DNI = ?`,
                                [usuario.nombres,
                                 usuario.paterno,
                                 usuario.materno,
                                 usuario.direccion,
                                 usuario.numContrato,
                                 usuario.telefono,
                                 usuario.idRol,
                                 usuario.estado,
                                 usuario.dni]);
      return usuario;
    } catch(error) {
      logger.error(`Error al actualizar usuario:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarUsuarioPorDni(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("UPDATE TBL_USUARIO SET ESTADO = ? WHERE DNI = ?", [UsuarioEstados.ELIMINADO, dni]);
    } catch(error) {
      logger.error(`Error al eliminar usuario por dni:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new UsuarioRepositorio();

