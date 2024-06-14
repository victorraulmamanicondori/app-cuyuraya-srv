import pool from '../config/db.js';
import { RolEstados } from '../constantes/estados.js';

class RolRepositorio {
  async listarRoles() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_ROL ORDER BY NOMBRE ASC");
      return filas.map(fila => new Rol(fila.ID_ROL,
                                       fila.NOMBRE,
                                       fila.ESTADO,
                                       fila.FEC_CREACION,
                                       fila.FEC_ACTUALIZACION));
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
      const filas = await conexion.query("SELECT * FROM TBL_ROL WHERE ID_ROL = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new Rol(fila.ID_ROL,
                       fila.NOMBRE,
                       fila.ESTADO,
                       fila.FEC_CREACION,
                       fila.FEC_ACTUALIZACION);
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
      const resultado = await conexion.query(`INSERT INTO TBL_ROL (NOMBRE,
                                                                   ESTADO)
                                              VALUES (?, ?)`,
                                                     [rol.nombre,
                                                      rol.estado]);
      rol.id = resultado.insertId.toString();
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
      await conexion.query(`UPDATE TBL_ROL
                            SET NOMBRE = ?,
                                ESTADO = ?
                            WHERE ID_ROL = ?`,
                                [rol.nombre,
                                 rol.estado,
                                 rol.id]);
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
      await conexion.query("UPDATE TBL_ROL SET ESTADO = ? WHERE ID_ROL = ?", [RolEstados.ELIMINADO, id]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new RolRepositorio();

