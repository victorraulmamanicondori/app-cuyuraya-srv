/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import PermisoModelo from '../modelos/PermisoModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class PermisoRepositorio {

  async listarPermisos() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_PERMISO ORDER BY NOMBRE ASC");
      return filas.map(fila => new PermisoModelo({
                                      idPermiso: fila.ID_PERMISO,
                                      nombre: fila.NOMBRE,
                                      descripcion: fila.DESCRIPCION,
                                      fecCreacion: fila.FEC_CREACION,
                                      fecActualizacion: fila.FEC_ACTUALIZACION
                                    }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async listarPermisosPorRol(idRol) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT P.* FROM TBL_PERMISO P 
                                          INNER JOIN TBL_ROL_PERMISO RP ON RP.ID_PERMISO = P.ID_PERMISO
                                          WHERE RP.ID_ROL = ? 
                                          ORDER BY NOMBRE ASC`, [toNullIfUndefined(idRol)]);
      return filas.map(fila => new PermisoModelo({
                                      idPermiso: fila.ID_PERMISO,
                                      nombre: fila.NOMBRE,
                                      descripcion: fila.DESCRIPCION,
                                      fecCreacion: fila.FEC_CREACION,
                                      fecActualizacion: fila.FEC_ACTUALIZACION
                                    }));
    } catch(error) {
      console.log(error);
      throw new Error("Error al listar permisos por rol");
    } finally {
      if (conexion) conexion.release();
    }
  }

  async listarPermisosPorUsuario(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT P.* FROM TBL_PERMISO P 
                                          INNER JOIN TBL_ROL_PERMISO RP ON RP.ID_PERMISO = P.ID_PERMISO
                                          WHERE RP.ID_ROL IN (
                                            SELECT UR.ID_ROL 
                                            FROM TBL_USUARIO_ROL UR 
                                            INNER JOIN TBL_USUARIO U 
                                            ON U.ID_USUARIO = UR.ID_USUARIO 
                                            WHERE U.DNI = ?
                                          ) 
                                          ORDER BY NOMBRE ASC`, [toNullIfUndefined(dni)]);
      return filas.map(fila => new PermisoModelo({
                                      idPermiso: fila.ID_PERMISO,
                                      nombre: fila.NOMBRE,
                                      descripcion: fila.DESCRIPCION,
                                      fecCreacion: fila.FEC_CREACION,
                                      fecActualizacion: fila.FEC_ACTUALIZACION
                                    }));
    } catch(error) {
      console.log(error);
      throw new Error("Error al listar permisos por usuario");
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerPermisoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_PERMISO WHERE ID_PERMISO = ?", [toNullIfUndefined(id)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new PermisoModelo({
                      idPermiso: fila.ID_PERMISO,
                      nombre: fila.NOMBRE,
                      descripcion: fila.DESCRIPCION,
                      fecCreacion: fila.FEC_CREACION,
                      fecActualizacion: fila.FEC_ACTUALIZACION
                    });
      }
      return null;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearPermiso(permiso) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_PERMISO (NOMBRE,
                                                                   DESCRIPCION)
                                              VALUES (?, ?)`,
                                                     [toNullIfUndefined(permiso.nombre),
                                                      toNullIfUndefined(permiso.descripcion)]);
      permiso.idPermiso = resultado.insertId;
      return permiso;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarPermiso(permiso) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_PERMISO
                            SET NOMBRE = ?,
                                DESCRIPCION = ?
                            WHERE ID_PERMISO = ?`,
                                [toNullIfUndefined(permiso.nombre),
                                  toNullIfUndefined(permiso.descripcion),
                                  toNullIfUndefined(permiso.idPermiso)]);
      return permiso;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarPermisoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_PERMISO WHERE ID_PERMISO = ?", [toNullIfUndefined(id)]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new PermisoRepositorio();
