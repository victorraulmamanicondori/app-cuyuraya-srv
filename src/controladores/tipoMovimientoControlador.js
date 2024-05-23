import logger from '../config/logger.js';
import tipoMovimientoServicio from '../servicios/tipoMovimientoServicio.js';

class TipoMovimientoControlador {

  async listarPorTipoRubro(req, res) {
    try {
      const tipoRubro = req.params.tipoRubro;
      const resultado = await tipoMovimientoServicio.listarPorRubro(tipoRubro);
      res.status(200).json(resultado);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

}

export default new TipoMovimientoControlador();

