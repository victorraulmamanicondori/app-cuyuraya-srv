/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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
        mensaje: 'Se registró exitosamente la tarifa',
        datos: nuevoTarifa
      });
    } catch(error) {
      logger.error(error);
      res.status(500).json({
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
        mensaje: 'Se actualizó exitosamente la tarifa',
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

