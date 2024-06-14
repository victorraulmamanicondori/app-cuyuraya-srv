import pool from '../config/db.js';

class DepartamentoRepositorio {

  async listarDepartamentos() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DEPARTAMENTO ORDER BY NOMBRE ASC");
      return filas.map(fila => new Departamento(fila.ID_DEPARTAMENTO, fila.NOMBRE));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar departamentos');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDepartamentoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_DEPARTAMENTO WHERE ID_DEPARTAMENTO = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new Departamento(fila.ID_DEPARTAMENTO, fila.NOMBRE);
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
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_DEPARTAMENTO (NOMBRE) VALUES (?)`, [departamento.nombre]);
      departamento.id = resultado.insertId.toString();
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
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_DEPARTAMENTO
                            SET NOMBRE = ?
                            WHERE ID_DEPARTAMENTO = ?`,
                                [departamento.nombre, departamento.id]);
      return departamento;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDepartamentoPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_DEPARTAMENTO WHERE ID_DEPARTAMENTO = ?", [id]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DepartamentoRepositorio();
