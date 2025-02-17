/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import distritoServicio from '../servicios/distritoServicio.js';

class DistritoControlador {

  async listarDistritosPorProvincia(req, res) {
    try {
      const codigoProvincia = req.params.codigoProvincia;
      const distritos = await distritoServicio.listarDistritosPorProvincia(codigoProvincia);
      res.status(200).json(distritos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerDistritoPorCodigo(req, res) {
    try {
      const { codigoDistrito } = req.params;
      const distrito = await distritoServicio.obtenerDistritoPorCodigo(codigoDistrito);
      if (distrito) {
        res.status(200).json(distrito);
      } else {
        res.status(404).json({ mensaje: 'distrito no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearDistrito(req, res) {
    try {
      const nuevoDistrito = await distritoServicio.crearDistrito(req.body);
      res.status(201).json(nuevoDistrito);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarDistrito(req, res) {
    try {
      const distritoActualizado = await distritoServicio.actualizarDistrito(req.body);
      res.status(200).json(distritoActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarDistritoPorCodigo(req, res) {
    try {
      const { codigoDistrito } = req.params;
      await distritoServicio.eliminarDistritoPorCodigo(codigoDistrito);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new DistritoControlador();

