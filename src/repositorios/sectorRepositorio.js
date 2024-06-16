import pool from '../config/db.js';
import SectorModelo from '../modelos/SectorModelo.js';

class SectorRepositorio {

  async listarSectoresPorComunidadCampesina(idComunidadCampesina) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_SECTOR WHERE ID_COMUNIDAD_CAMPESINA = ? ORDER BY NOMBRE ASC", [idComunidadCampesina]);
      return filas.map(fila => new SectorModelo({ idSector: fila.ID_SECTOR, 
                                                  nombre: fila.NOMBRE,
                                                  idComunidadCampesina: fila.ID_COMUNIDAD_CAMPESINA }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar sectors');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerSectorPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_SECTOR WHERE ID_SECTOR = ?", [id]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new SectorModelo({ idSector: fila.ID_SECTOR, 
                                  nombre: fila.NOMBRE,
                                  idComunidadCampesina: fila.ID_COMUNIDAD_CAMPESINA });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener sector');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearSector(sector) {
    let conexion;
    try {
      const { idSector, nombre, idComunidadCampesina } = sector;
      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_SECTOR (ID_SECTOR, NOMBRE, ID_COMUNIDAD_CAMPESINA) VALUES (?, ?, ?)`, [idSector, nombre, idComunidadCampesina]);
      sector.idSector = resultado.insertId.toString();
      return sector;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar sector');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarSector(sector) {
    let conexion;
    try {
      const { idSector, nombre, idComunidadCampesina } = sector;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_SECTOR
                            SET NOMBRE = ?, ID_COMUNIDAD_CAMPESINA = ?
                            WHERE ID_SECTOR = ?`,
                                [nombre, idComunidadCampesina, idSector]);
      return sector;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar sector');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarSectorPorId(id) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_SECTOR WHERE ID_SECTOR = ?", [id]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar sector');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new SectorRepositorio();
