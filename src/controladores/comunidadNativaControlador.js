/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import comunidadNativaServicio from '../servicios/comunidadNativaServicio.js';

class ComunidadNativaControlador {

  async listarComunidadesNativasPorDistrito(req, res) {
    try {
      const { codigoDistrito } = req.params;
      const comunidadNativas = await comunidadNativaServicio.listarComunidadesNativasPorDistrito(codigoDistrito);
      res.status(200).json(comunidadNativas);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerComunidadNativaPorCodigo(req, res) {
    try {
      const codigoComunidadNativa = req.params.codigoComunidadNativa;
      const comunidadNativa = await comunidadNativaServicio.obtenerComunidadNativaPorCodigo(codigoComunidadNativa);
      if (comunidadNativa) {
        res.status(200).json(comunidadNativa);
      } else {
        res.status(404).json({ mensaje: 'comunidadNativa no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearComunidadNativa(req, res) {
    try {
      const nuevoComunidadNativa = await comunidadNativaServicio.crearComunidadNativa(req.body);
      res.status(201).json(nuevoComunidadNativa);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarComunidadNativa(req, res) {
    try {
      const comunidadNativaActualizado = await comunidadNativaServicio.actualizarComunidadNativa(req.body);
      res.status(200).json(comunidadNativaActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarComunidadNativaPorCodigo(req, res) {
    try {
      const codigoComunidadNativa = req.params.codigoComunidadNativa;
      await comunidadNativaServicio.eliminarComunidadNativaPorCodigo(codigoComunidadNativa);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new ComunidadNativaControlador();

