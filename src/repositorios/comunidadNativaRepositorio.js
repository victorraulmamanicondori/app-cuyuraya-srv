import pool from '../config/db.js';
import ComunidadNativaModelo from '../modelos/ComunidadNativaModelo.js';

class ComunidadNativaRepositorio {

  async listarComunidadesNativasPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO = ? ORDER BY NOMBRE ASC", 
        [`${codigoDistrito}%`]);
      return filas.map(fila => new ComunidadNativaModelo({ codigo: fila.CODIGO, 
                                                            nombre: fila.NOMBRE,
                                                            familiaLinguistica: fila.FAM_LINGUISTICA,
                                                            etnia: fila.ETNIA }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar comunidadNativas');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerComunidadNativaPorCodigo(codigoComunidadNativa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO = ?", [codigoComunidadNativa]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ComunidadNativaModelo({ codigo: fila.CODIGO, 
                                         nombre: fila.NOMBRE,
                                         familiaLinguistica: fila.FAM_LINGUISTICA,
                                         etnia: fila.ETNIA });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener comunidadNativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearComunidadNativa(comunidadNativa) {
    let conexion;
    try {
      const { codigo, nombre, familiaLinguistica, etnia } = comunidadNativa;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_COMUNIDAD_NATIVA (CODIGO, NOMBRE, FAM_LINGUISTICA, ETNIA) VALUES (?, ?, ?, ?)`, 
        [codigo, nombre, familiaLinguistica, etnia]);
      return comunidadNativa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar comunidadNativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarComunidadNativa(comunidadNativa) {
    let conexion;
    try {
      const { codigo, nombre, familiaLinguistica, etnia } = comunidadNativa;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_COMUNIDAD_NATIVA
                            SET NOMBRE = ?, FAM_LINGUISTICA = ?, ETNIA = ?
                            WHERE CODIGO = ?`,
                                [nombre, familiaLinguistica, etnia, codigo]);
      return comunidadNativa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar Comunidad Campesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarComunidadNativaPorCodigo(codigoComunidadNativa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO = ?", [codigoComunidadNativa]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar Comunidad Campesina');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ComunidadNativaRepositorio();
