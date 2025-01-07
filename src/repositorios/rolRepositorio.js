import pool from '../config/db.js';
import RolModelo from '../modelos/RolModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class RolRepositorio {
  async listarRoles() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_ROL ORDER BY NOMBRE ASC");
      return filas.map(fila => new RolModelo({
                                      idRol: fila.ID_ROL,
                                      nombre: fila.NOMBRE,
                                      estado: fila.ESTADO,
                                      fecCreacion: fila.FEC_CREACION,
                                      fecActualizacion: fila.FEC_ACTUALIZACION
                                    }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async listarRolesPorUsuario(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute(`SELECT R.* FROM TBL_ROL R 
                                          INNER JOIN TBL_USUARIO_ROL UR ON UR.ID_ROL = R.ID_ROL
                                          INNER JOIN TBL_USUARIO U ON U.ID_USUARIO = UR.ID_USUARIO
                                          WHERE U.DNI = ?
                                          ORDER BY NOMBRE ASC`, [toNullIfUndefined(dni)]);
      return filas.map(fila => new RolModelo({
                                      idRol: fila.ID_ROL,
                                      nombre: fila.NOMBRE,
                                      estado: fila.ESTADO,
                                      fecCreacion: fila.FEC_CREACION,
                                      fecActualizacion: fila.FEC_ACTUALIZACION
                                    }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerRolPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_ROL WHERE ID_ROL = ?", [toNullIfUndefined(id)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new RolModelo({
                      idRol: fila.ID_ROL,
                      nombre: fila.NOMBRE,
                      estado: fila.ESTADO,
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

  async crearRol(rol) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_ROL (NOMBRE,
                                                                   ESTADO)
                                              VALUES (?, ?)`,
                                                     [toNullIfUndefined(rol.nombre),
                                                      toNullIfUndefined(rol.estado)]);
      rol.id = resultado.insertId;
      return rol;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarRol(rol) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_ROL
                            SET NOMBRE = ?,
                                ESTADO = ?
                            WHERE ID_ROL = ?`,
                                [toNullIfUndefined(rol.nombre),
                                  toNullIfUndefined(rol.estado),
                                  toNullIfUndefined(rol.id)]);
      return rol;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarRolPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_ROL WHERE ID_ROL = ?", [toNullIfUndefined(id)]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new RolRepositorio();

