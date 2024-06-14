import pool from '../config/db.js';

class DistritoRepositorio {

  async listarDistritosPorProvincia(idProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE ID_PROVINCIA = ? ORDER BY NOMBRE ASC", [idProvincia]);
      return filas.map(fila => new Distrito(fila.ID_DISTRITO, fila.NOMBRE, fila.ID_PROVINCIA));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDistritoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE ID_DISTRITO = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new Distrito(fila.ID_DISTRITO, fila.NOMBRE, fila.ID_PROVINCIA);
      }
      return null;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearDistrito(distrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_DISTRITO (NOMBRE, ID_PROVINCIA) VALUES (?)`, [distrito.nombre, distrito.id_provincia]);
      distrito.id = resultado.insertId.toString();
      return distrito;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarDistrito(distrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_DISTRITO
                            SET NOMBRE = ?, ID_PROVINCIA = ?
                            WHERE ID_DISTRITO = ?`,
                                [distrito.nombre, distrito.idProvincia, distrito.id]);
      return distrito;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDistritoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_DISTRITO WHERE ID_DISTRITO = ?", [id]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DistritoRepositorio();
