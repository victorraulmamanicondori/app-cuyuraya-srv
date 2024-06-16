import pool from '../config/db.js';
import ComunidadCampesinaModelo from '../modelos/ComunidadCampesinaModelo.js';

class ComunidadCampesinaRepositorio {

  async listarComunidadesCampesinasPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_COMUNIDAD_CAMPESINA WHERE COD_DISTRITO = ? ORDER BY NOMBRE ASC", [codigoDistrito]);
      return filas.map(fila => new ComunidadCampesinaModelo({ idComunidadCampesina: fila.ID_COMUNIDAD_CAMPESINA, 
                                                          nombre: fila.NOMBRE,
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
      const { idComunidadCampesina, nombre, codigoDistrito } = comunidadCampesina;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_COMUNIDAD_CAMPESINA (ID_COMUNIDAD_CAMPESINA, NOMBRE, COD_DISTRITO) VALUES (?, ?, ?)`, [idComunidadCampesina, nombre, codigoDistrito]);
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
      const { idComunidadCampesina, nombre, codigoDistrito } = comunidadCampesina;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_COMUNIDAD_CAMPESINA
                            SET NOMBRE = ?, COD_DISTRITO = ?
                            WHERE ID_COMUNIDAD_CAMPESINA = ?`,
                                [nombre, codigoDistrito, idComunidadCampesina]);
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
