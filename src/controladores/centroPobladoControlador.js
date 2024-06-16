import logger from '../config/logger.js';
import centroPobladoServicio from '../servicios/centroPobladoServicio.js';

class CentroPobladoControlador {

  async listarCentrosPobladosPorDistrito(req, res) {
    try {
      const codigoDistrito = req.params.codigoDistrito;
      const centroPoblados = await centroPobladoServicio.listarCentrosPobladosPorDistrito(codigoDistrito);
      res.status(200).json(centroPoblados);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerCentroPobladoPorId(req, res) {
    try {
      const id = req.params.id;
      const centroPoblado = await centroPobladoServicio.obtenerCentroPobladoPorId(id);
      if (centroPoblado) {
        res.status(200).json(centroPoblado);
      } else {
        res.status(404).json({ mensaje: 'CentroPoblado no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearCentroPoblado(req, res) {
    try {
      const nuevoCentroPoblado = await centroPobladoServicio.crearCentroPoblado(req.body);
      res.status(201).json(nuevoCentroPoblado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarCentroPoblado(req, res) {
    try {
      const centroPobladoActualizado = await centroPobladoServicio.actualizarCentroPoblado(req.body);
      res.status(200).json(centroPobladoActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarCentroPobladoPorId(req, res) {
    try {
      const id = req.params.id;
      await centroPobladoServicio.eliminarCentroPobladoPorId(id);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new CentroPobladoControlador();

