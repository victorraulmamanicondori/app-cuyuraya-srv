import pool from '../config/db.js';
import DistritoModelo from '../modelos/DistritoModelo.js';

class DistritoRepositorio {

  async listarDistritosPorProvincia(codigoDepartamento, codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? ORDER BY NOMBRE ASC", [codigoDepartamento, codigoProvincia]);
      return filas.map(fila => new DistritoModelo({ codigoDistrito: fila.COD_DISTRITO, 
                                              nombre: fila.NOMBRE, 
                                              codigoDepartamento: fila.COD_DEPARTAMENTO,
                                              codigoProvincia: fila.COD_PROVINCIA }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? AND COD_DISTRITO = ?", [codigoDepartamento, codigoProvincia, codigoDistrito]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new DistritoModelo({ codigoDistrito: fila.COD_DISTRITO, 
                              nombre: fila.NOMBRE, 
                              codigoDepartamento: fila.COD_DEPARTAMENTO,
                              codigoProvincia: fila.COD_PROVINCIA });
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
      const { codigoDistrito, nombre, codigoDepartamento, codigoProvincia } = distrito;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_DISTRITO (COD_DISTRITO, NOMBRE, COD_DEPARTAMENTO, COD_PROVINCIA) VALUES (?, ?, ?, ?)`, [codigoDistrito, nombre, codigoDepartamento, codigoProvincia]);
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
      const { codigoDistrito, nombre, codigoDepartamento, codigoProvincia } = distrito;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_DISTRITO
                            SET NOMBRE = ?
                            WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? AND COD_DISTRITO = ?`,
                                [nombre, codigoDepartamento, codigoProvincia, codigoDistrito]);
      return distrito;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_DISTRITO WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? AND COD_DISTRITO = ?", [codigoDepartamento, codigoProvincia, codigoDistrito]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DistritoRepositorio();
