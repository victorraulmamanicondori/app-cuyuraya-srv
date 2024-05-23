import logger from '../config/logger.js';
import lecturaServicio from '../servicios/lecturaServicio.js';

class LecturaControlador {

  async registrarLectura(req, res) {
    try {
      const resultado = await lecturaServicio.registrarLectura(req.body);
      res.status(200).json(resultado);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

}

export default new LecturaControlador();

