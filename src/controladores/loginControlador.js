import logger from '../config/logger.js';
import loginServicio from '../servicios/loginServicio.js';

class LoginControlador {

  async login(req, res) {
    try {
      const { dni, clave } = req.body;
      const tokenes = await loginServicio.login(dni, clave);
      res.status(200).json(tokenes);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

  refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const tokenes = loginServicio.refreshToken(refreshToken);
      res.status(200).json(tokenes);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  } 
}

export default new LoginControlador();

