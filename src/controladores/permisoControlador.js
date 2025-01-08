/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import logger from '../config/logger.js';
import permisoServicio from '../servicios/permisoServicio.js';

class PermisoControlador {

  async listarPermisos(req, res) {
    try {
      const permisos = await permisoServicio.listarPermisos();
      res.status(200).json(permisos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async listarPermisosPorRol(req, res) {
    try {
      const idRol = req.params.idRol;
      const permisos = await permisoServicio.listarPermisosPorRol(idRol);
      res.status(200).json(permisos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async listarPermisosPorUsuario(req, res) {
    try {
      const dni = req.params.dni;
      const permisos = await permisoServicio.listarPermisosPorUsuario(dni);
      res.status(200).json(permisos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerPermisoPorId(req, res) {
    try {
      const id = req.params.id;
      const permiso = await permisoServicio.obtenerPermisoPorId(id);
      if (permiso) {
        res.status(200).json(permiso);
      } else {
        res.status(404).json({ mensaje: 'Permiso no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearPermiso(req, res) {
    try {
      const nuevoPermiso = await permisoServicio.crearPermiso(req.body);
      res.status(201).json(nuevoPermiso);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarPermiso(req, res) {
    try {
      const permisoActualizado = await permisoServicio.actualizarPermiso(req.body);
      res.status(200).json(permisoActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarPermisoPorId(req, res) {
    try {
      const id = req.params.id;
      await permisoServicio.eliminarPermisoPorId(id);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new PermisoControlador();

