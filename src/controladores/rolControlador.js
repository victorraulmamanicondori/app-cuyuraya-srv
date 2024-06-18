import logger from '../config/logger.js';
import rolServicio from '../servicios/rolServicio.js';

class RolControlador {

  async listarRoles(req, res) {
    try {
      const roles = await rolServicio.listarRoles();
      res.status(200).json(roles);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async listarRolesPorUsuario(req, res) {
    try {
      const dni = req.params.dni;
      const roles = await rolServicio.listarRolesPorUsuario(dni);
      res.status(200).json(roles); 
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerRolPorId(req, res) {
    try {
      const id = req.params.id;
      const rol = await rolServicio.obtenerRolPorId(id);
      if (rol) {
        res.status(200).json(rol);
      } else {
        res.status(404).json({ mensaje: 'Rol no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearRol(req, res) {
    try {
      const nuevoRol = await rolServicio.crearRol(req.body);
      res.status(201).json(nuevoRol);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarRol(req, res) {
    try {
      const rolActualizado = await rolServicio.actualizarRol(req.body);
      res.status(200).json(rolActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarRolPorId(req, res) {
    try {
      const id = req.params.id;
      await rolServicio.eliminarRolPorId(id);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new RolControlador();

