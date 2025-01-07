import pool from '../config/db.js';
import DistritoModelo from '../modelos/DistritoModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class DistritoRepositorio {

  async listarDistritosPorProvincia(codigoProvincia) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_DISTRITO WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", [`${codigoProvincia}%`]);
      return filas.map(fila => new DistritoModelo({ codigo: fila.CODIGO, 
                                              nombre: fila.NOMBRE }));
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDistritoPorCodigo(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_DISTRITO WHERE CODIGO = ?", [toNullIfUndefined(codigoDistrito)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new DistritoModelo({ codigo: fila.CODIGO, 
                              nombre: fila.NOMBRE });
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
      const { codigo, nombre } = distrito;
      conexion = await pool.getConnection();
      await conexion.execute(`INSERT INTO TBL_DISTRITO (CODIGO, NOMBRE) VALUES (?, ?)`, [toNullIfUndefined(codigo), toNullIfUndefined(nombre)]);
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
      const { codigo, nombre } = distrito;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_DISTRITO
                            SET NOMBRE = ?
                            WHERE CODIGO = ?`,
                                [toNullIfUndefined(nombre), toNullIfUndefined(codigo)]);
      return distrito;
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDistritoPorCodigo(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_DISTRITO WHERE COD_DISTRITO = ?", [toNullIfUndefined(codigoDistrito)]);
    } catch(error) {
      console.log(error);
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DistritoRepositorio();
