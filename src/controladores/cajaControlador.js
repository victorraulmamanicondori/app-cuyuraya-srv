import logger from '../config/logger.js';
import cajaServicio from '../servicios/cajaServicio.js';

class CajaControlador {

  async registrarCaja(req, res) {
    try {
      const resultado = await cajaServicio.registrarCaja(req.body);
      res.status(200).json(resultado);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

}

export default new CajaControlador();

