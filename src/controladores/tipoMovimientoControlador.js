/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import tipoMovimientoServicio from '../servicios/tipoMovimientoServicio.js';

class TipoMovimientoControlador {

  async listarPorTipoRubro(req, res) {
    try {
      const tipoRubro = req.params.tipoRubro;
      const resultado = await tipoMovimientoServicio.listarPorRubro(tipoRubro);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Listado de tipos de movimientos',
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

export default new TipoMovimientoControlador();

