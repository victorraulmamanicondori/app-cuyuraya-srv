import bcrypt from 'bcrypt';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import { UsuarioEstados } from '../constantes/estados.js';

class UsuarioServicio {
  listarUsuarios() {
    return usuarioRepositorio.listarUsuarios();
  }

  obtenerUsuarioPorDni(dni) {
    return usuarioRepositorio.obtenerUsuarioPorDni(dni);
  }

  async crearUsuario(usuario) {
    const { clave } = usuario;
    const hashedClave = await bcrypt.hash(clave, 10);
    return usuarioRepositorio.crearUsuario({ ...usuario, clave: hashedClave, estado: UsuarioEstados.ACTIVO });
  }

  actualizarUsuario(usuario) {
    return usuarioRepositorio.actualizarUsuario(usuario);
  }

  eliminarUsuarioPorDni(dni) {
    return usuarioRepositorio.eliminarUsuarioPorDni(dni);
  }
}

export default new UsuarioServicio();

