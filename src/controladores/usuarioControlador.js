import logger from '../config/logger.js';
import usuarioServicio from '../servicios/usuarioServicio.js';

class UsuarioControlador {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await usuarioServicio.listarUsuarios();
      res.status(200).json(usuarios);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async asignarRolAlUsuario(req, res) {
    try {
      const dni = req.params.dni;
      const idRol = req.params.idRol;
      const rol = await usuarioServicio.asignarRolAlUsuario(dni, idRol);
      res.status(201).json(rol);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      const usuario = await usuarioServicio.obtenerUsuarioPorDni(dni);
      if (usuario) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuario
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'Usuario no encontrado'
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

  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = await usuarioServicio.crearUsuario(req.body);
      res.status(201).json(nuevoUsuario);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioServicio.actualizarUsuario(req.body);
      res.status(200).json(usuarioActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      await usuarioServicio.eliminarUsuarioPorDni(dni);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async resetearContrasenaPorDni(req, res) {
    try {
      const { dni } = req.body;
      await usuarioServicio.resetearContrasenaPorDni(dni);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Contraseña reseteado exitosamente',
        datos: dni
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

  async listarUsuariosPorUbigeo(req, res) {
    try {
      const codigoDistrito = req.params.codigoDistrito;
      const codigoCentroPoblado = req.query.codigoCentroPoblado;
      const codigoComunidadCampesina = req.query.codigoComunidadCampesina;
      const codigoComunidadNativa = req.query.codigoComunidadNativa;

      const usuarios = await usuarioServicio
        .obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa);
      if (usuarios) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuarios
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'No hay usuarios'
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

  async obtenerUsuarioPorId(req, res) {
    try {
      const idUsuario = req.params.idUsuario;
      const usuario = await usuarioServicio.obtenerUsuarioPorId(idUsuario);
      if (usuario) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuario
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'No hay usuario'
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
}

export default new UsuarioControlador();

