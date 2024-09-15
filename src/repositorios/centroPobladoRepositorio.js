import pool from '../config/db.js';
import CentroPobladoModelo from '../modelos/CentroPobladoModelo.js';

class CentroPobladoRepositorio {

  async listarCentroPobladosPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_CENTRO_POBLADO WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? AND COD_DISTRITO = ? ORDER BY NOMBRE ASC", 
        [codigoDepartamento, codigoProvincia, codigoDistrito]);
      return filas.map(fila => new CentroPobladoModelo({ idCentroPoblado: fila.ID_CENTRO_POBLADO, 
                                                         nombre: fila.NOMBRE,
                                                         codigoDepartamento: fila.COD_DEPARTAMENTO,
                                                         codigoProvincia: fila.COD_PROVINCIA,
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
                                         codigoDepartamento: fila.COD_DEPARTAMENTO,
                                         codigoProvincia: fila.COD_PROVINCIA,
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
      const { nombre, codigoDepartamento, codigoProvincia, codigoDistrito } = centroPoblado;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_CENTRO_POBLADO (NOMBRE, COD_DEPARTAMENTO, COD_PROVINCIA, COD_DISTRITO) VALUES (?, ?, ?, ?)`, 
        [nombre, codigoDepartamento, codigoProvincia, codigoDistrito]);
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
      const { idCentroPoblado, nombre, codigoDepartamento, codigoProvincia, codigoDistrito } = centroPoblado;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_CENTRO_POBLADO
                            SET NOMBRE = ?, COD_DEPARTAMENTO = ?, COD_PROVINCIA = ?, COD_DISTRITO = ?
                            WHERE ID_CENTRO_POBLADO = ?`,
                                [nombre, codigoDepartamento, codigoProvincia, codigoDistrito, idCentroPoblado]);
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
