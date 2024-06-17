import pool from '../config/db.js';
import PermisoModelo from '../modelos/PermisoModelo.js';

class PermisoRepositorio {

  async listarPermisos() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PERMISO ORDER BY NOMBRE ASC");
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

  async obtenerPermisoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PERMISO WHERE ID_PERMISO = ?", [id]);
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
      const resultado = await conexion.query(`INSERT INTO TBL_PERMISO (NOMBRE,
                                                                   DESCRIPCION)
                                              VALUES (?, ?)`,
                                                     [permiso.nombre,
                                                      permiso.descripcion]);
      permiso.idPermiso = resultado.insertId.toString();
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
      await conexion.query(`UPDATE TBL_PERMISO
                            SET NOMBRE = ?,
                                DESCRIPCION = ?
                            WHERE ID_PERMISO = ?`,
                                [permiso.nombre,
                                 permiso.descripcion,
                                 permiso.idPermiso]);
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
      await conexion.query("DELETE FROM TBL_PERMISO WHERE ID_PERMISO = ?", [id]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new PermisoRepositorio();
