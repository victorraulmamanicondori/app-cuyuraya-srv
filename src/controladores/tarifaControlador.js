import logger from '../config/logger.js';
import tarifaService from '../servicios/tarifaServicio.js';

class TarifaControlador {

  async listarTarifas(req, res) {
    try {
      const tarifas = await tarifaService.listarTarifas();
      res.status(200).json({
        codigo: 200,
        mensaje: '',
        datos: tarifas
      });
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async obtenerTarifaPorCodigo(req, res) {
    try {
      const codigoTarifa = req.params.codigoTarifa;
      const tarifa = await tarifaService.obtenerTarifaPorCodigo(codigoTarifa);
      if (tarifa) {
        res.status(200).json({
            codigo: 200,
            mensaje: '',
            datos: tarifa
        });
      } else {
        res.status(404).json({
            codigo: 404,
            mensaje: 'Tarifa no encontrado'
        });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    } 
  }

  async crearTarifa(req, res) {
    try {
      const nuevoTarifa = await tarifaService.crearTarifa(req.body);
      res.status(201).json({
        codigo: 201,
        mensaje: '',
        datos: nuevoTarifa
      });
    } catch(error) {
      logger.error(error);
      res.status(400).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async actualizarTarifa(req, res) {
    try {
      const tarifaActualizado = await tarifaService.actualizarTarifa(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: '',
        datos: tarifaActualizado
      });
    } catch(error) {
      logger.error(error);
      res.status(400).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async eliminarTarifaPorCodigo(req, res) {
    try {
      const codigoTarifa = req.params.codigoTarifa;
      await tarifaService.eliminarTarifaPorCodigo(codigoTarifa);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }
}

export default new TarifaControlador();

