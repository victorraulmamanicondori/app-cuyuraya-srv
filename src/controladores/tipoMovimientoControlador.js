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

