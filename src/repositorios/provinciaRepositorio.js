import pool from '../config/db.js';
import ProvinciaModelo from '../modelos/ProvinciaModelo.js';

class ProvinciaRepositorio {

  async listarProvinciasPorDepartamento(codigoDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE COD_DEPARTAMENTO = ? ORDER BY NOMBRE ASC", [codigoDepartamento]);
      return filas.map(fila => new ProvinciaModelo({
                                        codigo: fila.CODIGO,
                                        nombre: fila.NOMBRE,
                                        codigoDepartamento: fila.COD_DEPARTAMENTO
                                    }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerProvinciaPorCodigo(codigoDepartamento, codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ?", [codigoDepartamento, codigoProvincia]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ProvinciaModelo({
                              codigoProvincia: fila.COD_PROVINCIA,
                              nombre: fila.NOMBRE,
                              codigoDepartamento: fila.COD_DEPARTAMENTO
                            });
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
      const { codigoProvincia, nombre, codigoDepartamento } = provincia;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_PROVINCIA (COD_PROVINCIA, NOMBRE, COD_DEPARTAMENTO) VALUES (?, ?, ?)`, 
                                            [codigoProvincia, nombre, codigoDepartamento]);
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
      const { codigoProvincia, nombre, codigoDepartamento } = provincia;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_PROVINCIA
                            SET NOMBRE = ?
                            WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ?`,
                                [nombre, codigoDepartamento, codigoProvincia]);
      return provincia;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarProvinciaPorCodigo(codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_PROVINCIA WHERE COD_PROVINCIA = ?", [codigoProvincia]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar provincia');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ProvinciaRepositorio();
