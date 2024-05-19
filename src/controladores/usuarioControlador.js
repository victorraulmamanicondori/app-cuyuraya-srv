const usuarioServicio = require('../servicios/usuarioServicio');

class UsuarioControlador {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await usuarioServicio.listarUsuarios();
      res.status(200).json(usuarios);
    } catch(error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      const usuario = await usuarioServicio.obtenerUsuarioPorDni(dni);
      if (usuario) {
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
    } catch(error) {
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = await usuarioServicio.crearUsuario(req.body);
      res.status(201).json(nuevoUsuario);
    } catch(error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioServicio.actualizarUsuario(req.body);
      res.status(200).json(usuarioActualizado);
    } catch(error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      await usuarioServicio.eliminarUsuarioPorDni(dni);
      res.status(204).end();
    } catch(error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

module.exports = new UsuarioControlador();

