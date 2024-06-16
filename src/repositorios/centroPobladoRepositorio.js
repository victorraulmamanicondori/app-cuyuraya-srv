import pool from '../config/db.js';
import CentroPobladoModelo from '../modelos/CentroPobladoModelo.js';

class CentroPobladoRepositorio {

  async listarCentroPobladosPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_CENTRO_POBLADO WHERE COD_DISTRITO = ? ORDER BY NOMBRE ASC", [codigoDistrito]);
      return filas.map(fila => new CentroPobladoModelo({ idCentroPoblado: fila.ID_CENTRO_POBLADO, 
                                                          nombre: fila.NOMBRE,
                                                         codigoDistrito: fila.COD_DISTRITO }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar centroPoblados');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerCentroPobladoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_CENTRO_POBLADO WHERE ID_CENTRO_POBLADO = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new CentroPobladoModelo({ idCentroPoblado: fila.ID_CENTRO_POBLADO, 
                                         nombre: fila.NOMBRE,
                                         codigoDistrito: fila.COD_DISTRITO });
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
      const { nombre, codigoDistrito } = centroPoblado;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_CENTRO_POBLADO (NOMBRE, COD_DISTRITO) VALUES (?, ?)`, [nombre, codigoDistrito]);
      centroPoblado.idCentroPoblado = resultado.insertId.toString();
      return centroPoblado;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar centroPoblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarCentroPoblado(centroPoblado) {
    let conexion;
    try {
      const { idCentroPoblado, nombre, codigoDistrito } = centroPoblado;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_CENTRO_POBLADO
                            SET NOMBRE = ?, COD_DISTRITO = ?
                            WHERE ID_CENTRO_POBLADO = ?`,
                                [nombre, codigoDistrito, idCentroPoblado]);
      return centroPoblado;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar centroPoblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarCentroPobladoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_CENTRO_POBLADO WHERE ID_CENTRO_POBLADO = ?", [id]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar centroPoblado');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new CentroPobladoRepositorio();
