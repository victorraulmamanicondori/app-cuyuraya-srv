/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import comunidadCampesinaServicio from '../servicios/comunidadCampesinaServicio.js';

class ComunidadCampesinaControlador {

  async listarComunidadesCampesinasPorDistrito(req, res) {
    try {
      const { codigoDistrito } = req.params;
      const comunidadCampesinas = await comunidadCampesinaServicio.listarComunidadesCampesinasPorDistrito(codigoDistrito);
      res.status(200).json(comunidadCampesinas);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerComunidadCampesinaPorCodigo(req, res) {
    try {
      const codigoComunidadCampesina = req.params.codigoComunidadCampesina;
      const comunidadCampesina = await comunidadCampesinaServicio.obtenerComunidadCampesinaPorCodigo(codigoComunidadCampesina);
      if (comunidadCampesina) {
        res.status(200).json(comunidadCampesina);
      } else {
        res.status(404).json({ mensaje: 'comunidadCampesina no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearComunidadCampesina(req, res) {
    try {
      const nuevoComunidadCampesina = await comunidadCampesinaServicio.crearComunidadCampesina(req.body);
      res.status(201).json(nuevoComunidadCampesina);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarComunidadCampesina(req, res) {
    try {
      const comunidadCampesinaActualizado = await comunidadCampesinaServicio.actualizarComunidadCampesina(req.body);
      res.status(200).json(comunidadCampesinaActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarComunidadCampesinaPorCodigo(req, res) {
    try {
      const codigoComunidadCampesina = req.params.codigoComunidadCampesina;
      await comunidadCampesinaServicio.eliminarComunidadCampesinaPorCodigo(codigoComunidadCampesina);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new ComunidadCampesinaControlador();

