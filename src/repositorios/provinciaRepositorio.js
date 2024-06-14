import pool from '../config/db.js';

class ProvinciaRepositorio {

  async listarProvinciasPorDepartamento(idDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE ID_DEPARTAMENTO = ? ORDER BY NOMBRE ASC", [idDepartamento]);
      return filas.map(fila => new Provincia(fila.ID_PROVINCIA, fila.NOMBRE, fila.ID_DEPARTAMENTO));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerProvinciaPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE ID_PROVINCIA = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new Provincia(fila.ID_PROVINCIA, fila.NOMBRE);
      }
      return null;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearProvincia(provincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_PROVINCIA (NOMBRE, ID_DEPARTAMENTO) VALUES (?, ?)`, [provincia.nombre, provincia.idDepartamento]);
      provincia.id = resultado.insertId.toString();
      return provincia;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarProvincia(provincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_PROVINCIA
                            SET NOMBRE = ?, ID_DEPARTAMENTO = ?
                            WHERE ID_PROVINCIA = ?`,
                                [provincia.nombre, provincia.idDepartamento, provincia.id]);
      return provincia;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarProvinciaPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_PROVINCIA WHERE ID_PROVINCIA = ?", [id]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ProvinciaRepositorio();
