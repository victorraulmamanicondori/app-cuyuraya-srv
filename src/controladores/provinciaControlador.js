/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import provinciaServicio from '../servicios/provinciaServicio.js';

class ProvinciaControlador {

  async listarProvinciasPorDepartamento(req, res) {
    try {
      const codigoDepartamento = req.params.codigoDepartamento;
      const provincias = await provinciaServicio.listarProvinciasPorDepartamento(codigoDepartamento);
      res.status(200).json(provincias);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerProvinciaPorCodigo(req, res) {
    try {
      const { codigoProvincia } = req.params;
      const provincia = await provinciaServicio.obtenerProvinciaPorCodigo(codigoProvincia);
      if (provincia) {
        res.status(200).json(provincia);
      } else {
        res.status(404).json({ mensaje: 'provincia no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearProvincia(req, res) {
    try {
      const nuevoProvincia = await provinciaServicio.crearProvincia(req.body);
      res.status(201).json(nuevoProvincia);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarProvincia(req, res) {
    try {
      const provinciaActualizado = await provinciaServicio.actualizarProvincia(req.body);
      res.status(200).json(provinciaActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarProvinciaPorCodigo(req, res) {
    try {
      const { codigoProvincia } = req.params;
      await provinciaServicio.eliminarProvinciaPorCodigo(codigoProvincia);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new ProvinciaControlador();

