import pool from '../config/db.js';
import DepartamentoModelo from '../modelos/DepartamentoModelo.js';

class DepartamentoRepositorio {

  async listarDepartamentos() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DEPARTAMENTO ORDER BY NOMBRE ASC");
      return filas.map(fila => new DepartamentoModelo({ codigo: fila.COD_DEPARTAMENTO, 
                                                  nombre: fila.NOMBRE }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar departamentos');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDepartamentoPorCodigo(codigoDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DEPARTAMENTO WHERE COD_DEPARTAMENTO = ?", [codigoDepartamento]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new DepartamentoModelo({ codigo: fila.COD_DEPARTAMENTO, 
                                  nombre: fila.NOMBRE });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearDepartamento(departamento) {
    let conexion;
    try {
      const { codigoDepartamento, nombre } = departamento;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_DEPARTAMENTO (COD_DEPARTAMENTO, NOMBRE) VALUES (?, ?)`, [codigoDepartamento, nombre]);
      return departamento;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarDepartamento(departamento) {
    let conexion;
    try {
      const { codigoDepartamento, nombre } = departamento;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_DEPARTAMENTO
                            SET NOMBRE = ?
                            WHERE COD_DEPARTAMENTO = ?`,
                                [nombre, codigoDepartamento]);
      return departamento;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDepartamentoPorCodigo(codigoDepartamento) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_DEPARTAMENTO WHERE COD_DEPARTAMENTO = ?", [codigoDepartamento]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DepartamentoRepositorio();
