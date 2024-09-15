import pool from '../config/db.js';
import ComunidadCampesinaModelo from '../modelos/ComunidadCampesinaModelo.js';

class ComunidadCampesinaRepositorio {

  async listarComunidadesCampesinasPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_COMUNIDAD_CAMPESINA WHERE COD_DEPARTAMENTO = ? AND COD_PROVINCIA = ? AND COD_DISTRITO = ? ORDER BY NOMBRE ASC", 
        [codigoDepartamento, codigoProvincia, codigoDistrito]);
      return filas.map(fila => new ComunidadCampesinaModelo({ idComunidadCampesina: fila.ID_COMUNIDAD_CAMPESINA, 
                                                              nombre: fila.NOMBRE,
                                                              codigoDepartamento: fila.COD_DEPARTAMENTO,
                                                              codigoProvincia: fila.COD_PROVINCIA,
                                                              codigoDistrito: fila.COD_DISTRITO }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar comunidadCampesinas');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerComunidadCampesinaPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_COMUNIDAD_CAMPESINA WHERE ID_COMUNIDAD_CAMPESINA = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ComunidadCampesinaModelo({ idComunidadCampesina: fila.ID_COMUNIDAD_CAMPESINA, 
                                         nombre: fila.NOMBRE,
                                         codigoDepartamento: fila.COD_DEPARTAMENTO,
                                         codigoProvincia: fila.COD_PROVINCIA,
                                         codigoDistrito: fila.COD_DISTRITO });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener comunidadCampesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearComunidadCampesina(comunidadCampesina) {
    let conexion;
    try {
      const { nombre, codigoDepartamento, codigoProvincia, codigoDistrito } = comunidadCampesina;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_COMUNIDAD_CAMPESINA (NOMBRE, COD_DEPARTAMENTO, COD_PROVINCIA, COD_DISTRITO) VALUES (?, ?, ?, ?)`, 
        [nombre, codigoDepartamento, codigoProvincia, codigoDistrito]);
      comunidadCampesina.idComunidadCampesina = resultado.insertId.toString();
      return comunidadCampesina;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar comunidadCampesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarComunidadCampesina(comunidadCampesina) {
    let conexion;
    try {
      const { idComunidadCampesina, nombre, codigoDepartamento, codigoProvincia, codigoDistrito } = comunidadCampesina;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_COMUNIDAD_CAMPESINA
                            SET NOMBRE = ?, COD_DEPARTAMENTO = ?, COD_PROVINCIA = ?, COD_DISTRITO = ?
                            WHERE ID_COMUNIDAD_CAMPESINA = ?`,
                                [nombre, codigoDepartamento, codigoProvincia, codigoDistrito, idComunidadCampesina]);
      return comunidadCampesina;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar comunidadCampesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarComunidadCampesinaPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_COMUNIDAD_CAMPESINA WHERE ID_COMUNIDAD_CAMPESINA = ?", [id]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar comunidadCampesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ComunidadCampesinaRepositorio();
