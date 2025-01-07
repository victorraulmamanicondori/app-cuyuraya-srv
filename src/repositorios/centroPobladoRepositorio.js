import pool from '../config/db.js';
import CentroPobladoModelo from '../modelos/CentroPobladoModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class CentroPobladoRepositorio {

  async listarCentroPobladosPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_CENTRO_POBLADO WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", 
        [toNullIfUndefined(codigoDistrito)]);
      return filas.map(fila => new CentroPobladoModelo({ codigo: fila.CODIGO, 
                                                         nombre: fila.NOMBRE,
                                                         area: fila.AREA }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar Centro Poblados');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerCentroPobladoPorCodigo(codigoCentroPoblado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_CENTRO_POBLADO WHERE CODIGO = ?", [toNullIfUndefined(codigoCentroPoblado)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new CentroPobladoModelo({ codigo: fila.CODIGO, 
                                         nombre: fila.NOMBRE,
                                         area: fila.AREA });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener centroPoblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearCentroPoblado(centroPoblado) {
    let conexion;
    try {
      const { codigo, nombre, area } = centroPoblado;
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_CENTRO_POBLADO (CODIGO, NOMBRE, AREA) VALUES (?, ?, ?)`, 
        [toNullIfUndefined(codigo), toNullIfUndefined(nombre), toNullIfUndefined(area)]);
      return centroPoblado;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar Centro Poblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarCentroPoblado(centroPoblado) {
    let conexion;
    try {
      const { codigo, nombre, area } = centroPoblado;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_CENTRO_POBLADO
                            SET NOMBRE = ?, AREA = ?
                            WHERE CODIGO = ?`,
                                [toNullIfUndefined(nombre), toNullIfUndefined(area), toNullIfUndefined(codigo)]);
      return centroPoblado;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar centroPoblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarCentroPobladoPorCodigo(codigoCentroPoblado) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_CENTRO_POBLADO WHERE CODIGO = ?", [toNullIfUndefined(codigoCentroPoblado)]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar Centro Poblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new CentroPobladoRepositorio();
