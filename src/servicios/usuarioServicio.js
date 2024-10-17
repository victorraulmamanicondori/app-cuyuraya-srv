import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import {UsuarioEstados} from '../constantes/estados.js';
import departamentoRepositorio from '../repositorios/departamentoRepositorio.js';
import distritoRepositorio from '../repositorios/distritoRepositorio.js';
import provinciaRepositorio from '../repositorios/provinciaRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import usuarioRolRepositorio from '../repositorios/usuarioRolRepositorio.js';

class UsuarioServicio {

  listarUsuarios() {
    return usuarioRepositorio.listarUsuarios();
  }

  async obtenerUsuarioPorDni(dni) {
    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (usuario) {
      if (usuario.codigoDistrito) {
        const codigoDepartamento = usuario.codigoDistrito.substring(0, 2);
        const codigoProvincia = usuario.codigoDistrito.substring(0, 4);
  
        const departamento = await departamentoRepositorio.obtenerDepartamentoPorCodigo(codigoDepartamento);
        const provincia = await provinciaRepositorio.obtenerProvinciaPorCodigo(codigoProvincia);
        const distrito = await distritoRepositorio.obtenerDistritoPorCodigo(usuario.codigoDistrito);
  
        usuario.nombreDepartamento = departamento.nombre;
        usuario.nombreProvincia = provincia.nombre;
        usuario.nombreDistrito = distrito.nombre;
      }
      
      usuario.clave = null;
    }

    return usuario;
  }

  async asignarRolAlUsuario(dni, idRol) {
    // Obtenemos id del usuario por dni
    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    // Verificamos si existe usuario, sino existe lanzamos un error
    if (!usuario) {
      throw Error("No existe usuario con el dni indicado");
    }
    
    // Cuando existe, registramos id del usuario y id del rol en la tabla TBL_USUARIO_ROL
    const { idUsuario } = usuario;
    const resultado = await usuarioRolRepositorio.asignarRolAlUsuario(idUsuario, idRol);

    return resultado;
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

  async resetearContrasenaPorDni(dni) {
    logger.info(`Reseteando contrasena para dni ${dni}`);

    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    logger.info(`Usuario: ${usuario.nombres}`);

    if (usuario == null) {
      throw new Error("No se puede resetear contraseña del usuario");
    }

    const hashedClave = await bcrypt.hash(dni, 10);
    usuarioRepositorio.resetearContrasenaPorDni({ dni, clave: hashedClave });
  }

  async obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa) {
    const usuarios = await usuarioRepositorio.obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa);
    return usuarios;
  }

  async obtenerUsuarioPorId(idUsuario) {
    return usuarioRepositorio.obtenerUsuarioPorId(idUsuario);
  }
}

export default new UsuarioServicio();

