import pool from '../config/db.js';
import ComunidadCampesinaModelo from '../modelos/ComunidadCampesinaModelo.js';

class ComunidadCampesinaRepositorio {

  async listarComunidadesCampesinasPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_COMUNIDAD_CAMPESINA WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", 
        [`${codigoDistrito}%`]);
      return filas.map(fila => new ComunidadCampesinaModelo({ codigo: fila.CODIGO, 
                                                              nombre: fila.NOMBRE }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar comunidadCampesinas');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerComunidadCampesinaPorCodigo(codigoComunidadCampesina) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_COMUNIDAD_CAMPESINA WHERE CODIGO = ?", [codigoComunidadCampesina]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ComunidadCampesinaModelo({ codigo: fila.CODIGO, 
                                         nombre: fila.NOMBRE });
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
      const { codigo, nombre } = comunidadCampesina;
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_COMUNIDAD_CAMPESINA (CODIGO, NOMBRE) VALUES (?, ?)`, 
        [codigo, nombre]);
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
      const { codigo, nombre } = comunidadCampesina;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_COMUNIDAD_CAMPESINA
                            SET NOMBRE = ?
                            WHERE CODIGO = ?`,
                                [nombre, codigo]);
      return comunidadCampesina;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar Comunidad Campesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarComunidadCampesinaPorCodigo(codigoComunidadCampesina) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_COMUNIDAD_CAMPESINA WHERE CODIGO = ?", [codigoComunidadCampesina]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar Comunidad Campesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ComunidadCampesinaRepositorio();
