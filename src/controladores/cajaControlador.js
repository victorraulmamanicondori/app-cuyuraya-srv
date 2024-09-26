import logger from '../config/logger.js';
import cajaServicio from '../servicios/cajaServicio.js';

class CajaControlador {

  async registrarCaja(req, res) {
    try {
      const resultado = await cajaServicio.registrarCaja(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Resultado de registro de movimiento en caja',
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

export default new CajaControlador();

