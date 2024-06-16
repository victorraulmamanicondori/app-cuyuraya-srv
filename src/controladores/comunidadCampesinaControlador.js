import logger from '../config/logger.js';
import comunidadCampesinaServicio from '../servicios/comunidadCampesinaServicio.js';

class ComunidadCampesinaControlador {

  async listarComunidadesCampesinasPorDistrito(req, res) {
    try {
      const codigoDistrito = req.params.codigoDistrito;
      const comunidadCampesinas = await comunidadCampesinaServicio.listarComunidadesCampesinasPorDistrito(codigoDistrito);
      res.status(200).json(comunidadCampesinas);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerComunidadCampesinaPorId(req, res) {
    try {
      const id = req.params.id;
      const comunidadCampesina = await comunidadCampesinaServicio.obtenerComunidadCampesinaPorId(id);
      if (comunidadCampesina) {
        res.status(200).json(comunidadCampesina);
      } else {
        res.status(404).json({ mensaje: 'comunidadCampesina no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearComunidadCampesina(req, res) {
    try {
      const nuevoComunidadCampesina = await comunidadCampesinaServicio.crearComunidadCampesina(req.body);
      res.status(201).json(nuevoComunidadCampesina);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarComunidadCampesina(req, res) {
    try {
      const comunidadCampesinaActualizado = await comunidadCampesinaServicio.actualizarComunidadCampesina(req.body);
      res.status(200).json(comunidadCampesinaActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarComunidadCampesinaPorId(req, res) {
    try {
      const id = req.params.id;
      await comunidadCampesinaServicio.eliminarComunidadCampesinaPorId(id);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new ComunidadCampesinaControlador();

