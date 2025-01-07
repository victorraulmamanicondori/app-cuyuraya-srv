import pool from '../config/db.js';
import ProvinciaModelo from '../modelos/ProvinciaModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class ProvinciaRepositorio {

  async listarProvinciasPorDepartamento(codigoDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_PROVINCIA WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", [toNullIfUndefined(codigoDepartamento)]);
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
      const [filas] = await conexion.execute("SELECT * FROM TBL_PROVINCIA WHERE CODIGO = ?", [toNullIfUndefined(codigoProvincia)]);
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
      await conexion.execute(`INSERT INTO TBL_PROVINCIA (CODIGO, NOMBRE) VALUES (?, ?)`, 
                                            [toNullIfUndefined(codigo), toNullIfUndefined(nombre)]);
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
      await conexion.execute(`UPDATE TBL_PROVINCIA
                            SET NOMBRE = ?
                            WHERE CODIGO = ?`,
                                [toNullIfUndefined(nombre), toNullIfUndefined(codigo)]);
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
      await conexion.execute("DELETE FROM TBL_PROVINCIA WHERE CODIGO = ?", [toNullIfUndefined(codigoProvincia)]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar provincia');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ProvinciaRepositorio();
