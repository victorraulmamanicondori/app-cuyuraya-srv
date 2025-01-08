/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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
      res.status(400).json({ mensaje: error.message });
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

