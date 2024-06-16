import pool from '../config/db.js';
import DistritoModelo from '../modelos/DistritoModelo.js';

class DistritoRepositorio {

  async listarDistritosPorProvincia(codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE COD_PROVINCIA = ? ORDER BY NOMBRE ASC", [codigoProvincia]);
      return filas.map(fila => new DistritoModelo({ codigo: fila.CODIGO, 
                                              nombre: fila.NOMBRE, 
                                              codigoProvincia: fila.COD_PROVINCIA }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDistritoPorCodigo(codigo) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DISTRITO WHERE CODIGO = ?", [codigo]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new DistritoModelo({ codigo: fila.CODIGO, 
                              nombre: fila.NOMBRE, 
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
      const { codigo, nombre, codigoProvincia } = distrito;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_DISTRITO (CODIGO, NOMBRE, COD_PROVINCIA) VALUES (?, ?, ?)`, [codigo, nombre, codigoProvincia]);
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
      const { codigo, nombre, codigoProvincia } = distrito;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_DISTRITO
                            SET NOMBRE = ?, COD_PROVINCIA = ?
                            WHERE CODIGO = ?`,
                                [nombre, codigoProvincia, codigo]);
      return distrito;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDistritoPorCodigo(codigo) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_DISTRITO WHERE CODIGO = ?", [codigo]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DistritoRepositorio();
