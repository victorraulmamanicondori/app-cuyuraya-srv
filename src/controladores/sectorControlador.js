import logger from '../config/logger.js';
import sectorServicio from '../servicios/sectorServicio.js';

class SectorControlador {

  async listarSectoresPorComunidadCampesina(req, res) {
    try {
      const idComunidadCampesina = req.params.idComunidadCampesina;
      const sectores = await sectorServicio.listarSectoresPorComunidadCampesina(idComunidadCampesina);
      res.status(200).json(sectores);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerSectorPorId(req, res) {
    try {
      const id = req.params.id;
      const sector = await sectorServicio.obtenerSectorPorId(id);
      if (sector) {
        res.status(200).json(sector);
      } else {
        res.status(404).json({ mensaje: 'Sector no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearSector(req, res) {
    try {
      const nuevoSector = await sectorServicio.crearSector(req.body);
      res.status(201).json(nuevoSector);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarSector(req, res) {
    try {
      const sectorActualizado = await sectorServicio.actualizarSector(req.body);
      res.status(200).json(sectorActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarSectorPorId(req, res) {
    try {
      const id = req.params.id;
      await sectorServicio.eliminarSectorPorId(id);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new SectorControlador();

