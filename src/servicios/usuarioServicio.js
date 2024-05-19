const usuarioRepositorio = require('../repositorios/usuarioRepositorio.js');

class UsuarioServicio {
  listarUsuarios() {
    return usuarioRepositorio.listarUsuarios();
  }

  obtenerUsuarioPorDni(dni) {
    return usuarioRepositorio.obtenerUsuarioPorDni(dni);
  }

  crearUsuario(usuario) {
    return usuarioRepositorio.crearUsuario(usuario);
  }

  actualizarUsuario(usuario) {
    return usuarioRepositorio.actualizarUsuario(usuario);
  }

  eliminarUsuarioPorDni(dni) {
    return usuarioRepositorio.eliminarUsuarioPorDni(dni);
  }
}

module.exports = new UsuarioServicio();

