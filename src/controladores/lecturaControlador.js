import logger from '../config/logger.js';
import lecturaServicio from '../servicios/lecturaServicio.js';

class LecturaControlador {

  async registrarLectura(req, res) {
    try {
      const resultado = await lecturaServicio.registrarLectura(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Se ha registrado lectura exitosamente',
        datos: resultado
      });
    } catch(error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }

}

export default new LecturaControlador();

