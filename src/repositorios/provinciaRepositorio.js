import pool from '../config/db.js';
import ProvinciaModelo from '../modelos/ProvinciaModelo.js';

class ProvinciaRepositorio {

  async listarProvinciasPorDepartamento(codigoDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", [`${codigoDepartamento}%`]);
      return filas.map(fila => new ProvinciaModelo({
                                        codigo: fila.CODIGO,
                                        nombre: fila.NOMBRE
                                    }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerProvinciaPorCodigo(codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_PROVINCIA WHERE CODIGO = ?", [codigoProvincia]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ProvinciaModelo({
                              codigo: fila.CODIGO,
                              nombre: fila.NOMBRE
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
      const { codigo, nombre } = provincia;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_PROVINCIA (CODIGO, NOMBRE) VALUES (?, ?)`, 
                                            [codigo, nombre]);
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
      const { codigo, nombre } = provincia;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_PROVINCIA
                            SET NOMBRE = ?
                            WHERE CODIGO = ?`,
                                [nombre, codigo]);
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
      await conexion.query("DELETE FROM TBL_PROVINCIA WHERE CODIGO = ?", [codigoProvincia]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar provincia');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ProvinciaRepositorio();
