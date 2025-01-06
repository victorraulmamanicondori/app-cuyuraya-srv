import logger from '../config/logger.js';
import medidorServicio from '../servicios/medidorServicio.js';

class MedidorControlador {

  async asignarMedidor(req, res) {
    try {
      const { codigoMedidor, dni } = req.body;
      const resultado = await medidorServicio.asignarMedidor(codigoMedidor, dni);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Medidor asignado exitosamente',
        datos: resultado
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }

  async eliminarAsignacionMedidor(req, res) {
    try {
      const { codigoMedidor, dni } = req.body;
      const resultado = await medidorServicio.eliminarAsignacionMedidor(codigoMedidor, dni);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Medidor desasignado exitosamente',
        datos: resultado
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }

  async obtenerMedidorPorDni(req, res) {
    try {
      const { dni } = req.params;
      const resultado = await medidorServicio.obtenerMedidorPorDni(dni);
      if (resultado) {
        res.status(200).json({
          codigo: 200,
          mensaje: '',
          datos: resultado
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: `No existe medidor asignado al dni ${dni}`,
          datos: null
        });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message,
        datos: null
      });
    }
  }

  async obtenerMedidorPorCodigo(req, res) {
    try {
      const { codigoMedidor } = req.params;
      const resultado = await medidorServicio.obtenerMedidorPorCodigo(codigoMedidor);
      if (resultado) {
        res.status(200).json({
          codigo: 200,
          mensaje: '',
          datos: resultado
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: `No existe medidor asignado con código ${codigoMedidor}`,
          datos: null
        });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message,
        datos: null
      });
    }
  }
}

export default new MedidorControlador();

