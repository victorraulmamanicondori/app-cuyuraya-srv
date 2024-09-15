import logger from '../config/logger.js';
import distritoServicio from '../servicios/distritoServicio.js';

class distritoControlador {

  async listarDistritosPorProvincia(req, res) {
    try {
      const codigoProvincia = req.params.codigoProvincia;
      const distritos = await distritoServicio.listarDistritosPorProvincia(codigoProvincia);
      res.status(200).json(distritos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerDistritoPorCodigo(req, res) {
    try {
      const { codigoDepartamento, codigoProvincia, codigoDistrito } = req.params;
      const distrito = await distritoServicio
        .obtenerDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito);
      if (distrito) {
        res.status(200).json(distrito);
      } else {
        res.status(404).json({ mensaje: 'distrito no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearDistrito(req, res) {
    try {
      const nuevoDistrito = await distritoServicio.crearDistrito(req.body);
      res.status(201).json(nuevoDistrito);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarDistrito(req, res) {
    try {
      const distritoActualizado = await distritoServicio.actualizarDistrito(req.body);
      res.status(200).json(distritoActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarDistritoPorCodigo(req, res) {
    try {
      const { codigoDepartamento, codigoProvincia, codigoDistrito } = req.params;
      await distritoServicio.eliminarDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new distritoControlador();

