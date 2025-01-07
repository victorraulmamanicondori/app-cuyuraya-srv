import bcrypt from 'bcrypt';
import logger from '../config/logger.js';
import { LONGITUD_HASH } from '../constantes/constantes.js';
import {UsuarioEstados} from '../constantes/estados.js';
import centroPobladoRepositorio from '../repositorios/centroPobladoRepositorio.js';
import comunidadCampesinaRepositorio from '../repositorios/comunidadCampesinaRepositorio.js';
import comunidadNativaRepositorio from '../repositorios/comunidadNativaRepositorio.js';
import departamentoRepositorio from '../repositorios/departamentoRepositorio.js';
import distritoRepositorio from '../repositorios/distritoRepositorio.js';
import medidorRepositorio from '../repositorios/medidorRepositorio.js';
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
        const centroPoblado = await centroPobladoRepositorio.obtenerCentroPobladoPorCodigo(usuario.codigoCentroPoblado);
        const comunidadCampesina = await comunidadCampesinaRepositorio.obtenerComunidadCampesinaPorCodigo(usuario.codigoComunidadCampesina);
        const comunidadNativa = await comunidadNativaRepositorio.obtenerComunidadNativaPorCodigo(usuario.codigoComunidadNativa);
  
        usuario.nombreDepartamento = departamento.nombre;
        usuario.nombreProvincia = provincia.nombre;
        usuario.nombreDistrito = distrito.nombre;

        if (centroPoblado) {
          usuario.codigoCentroPoblado = centroPoblado.codigo;
          usuario.nombreCentroPoblado = centroPoblado.nombre;
        }

        if (comunidadCampesina) {
          usuario.codigoComunidadCampesina = comunidadCampesina.codigo;
          usuario.nombreComunidadCampesina = comunidadCampesina.nombre;
        }

        if (comunidadNativa) {
          usuario.codigoComunidadNativa = comunidadNativa.codigo;
          usuario.nombreComunidadNativa = comunidadNativa.nombre;
        }
      }

      const medidores = await medidorRepositorio.obtenerMedidorPorIdUsuario(usuario.idUsuario);
      if (medidores && medidores.length > 0) {
        const codigosMedidores = medidores.map(medidor => medidor.codigoMedidor);
        const listaUnidaCodMedidores = codigosMedidores.join(', ');

        usuario.codigoMedidor = listaUnidaCodMedidores;
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
    const hashedClave = await bcrypt.hash(clave, LONGITUD_HASH);
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

    const hashedClave = await bcrypt.hash(dni, LONGITUD_HASH);
    usuarioRepositorio.resetearContrasenaPorDni({ dni, clave: hashedClave });
  }

  async obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa) {
    const usuarios = await usuarioRepositorio.obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa);
    return usuarios;
  }

  async obtenerUsuarioPorId(idUsuario) {
    return usuarioRepositorio.obtenerUsuarioPorId(idUsuario);
  }

  async cargaMasivoUsuarios(usuarios) {
    if (!Array.isArray(usuarios)) {
      throw new Error('El cuerpo de la solicitud debe ser un array de usuarios.');
    }

    usuarios.forEach(async usuario => {
      // Extraer y validar campos específicos
      const dni = usuario.dni ? `${usuario.dni}`.replace(/[Oo]/g, '0').trim() : null; // Corregir posibles letra 'O' u 'o' en lugar de '0' cero
      const nombres = usuario.nombres ? `${usuario.nombres}`.trim() : null;
      const paterno = usuario.paterno ? `${usuario.paterno}`.trim() : null;
      const materno = usuario.materno ? `${usuario.materno}`.trim() : null;
      const direccion = usuario.direccion ? `${usuario.direccion}`.trim() : null;
      const codigoMedidor = usuario.codigoMedidor ? `${usuario.codigoMedidor}`.trim() : null;
      const codigoDistrito = usuario.codigoDistrito ? `${usuario.codigoDistrito}`.trim() : null;
      const codigoCentroPoblado = usuario.codigoCentroPoblado ? `${usuario.codigoCentroPoblado}`.trim() : null;
      const codigoComunidadCampesina = usuario.codigoComunidadCampesina ? `${usuario.codigoComunidadCampesina}`.trim() : null;
      const codigoComunidadNativa = usuario.codigoComunidadNativa ? `${usuario.codigoComunidadNativa}`.trim() : null;

      // Validar campos obligatorios
      if (dni && nombres && paterno && materno && direccion && codigoMedidor && codigoDistrito) {
          if (/^\d{8}$/.test(dni) === false) {
            usuario.errores.push(`Error en ${usuario.fila}, DNI invalido, debe ser 8 digitos`);
          }
          if (nombres.length > 255) {
            usuario.errores.push(`Error en ${usuario.fila}, longitud maximo para nombres es 255 letras`);
          }
          if (paterno.length > 255) {
            usuario.errores.push(`Error en ${usuario.fila}, longitud maximo para paterno es 255 letras`);
          }
          if (materno.length > 255) {
            usuario.errores.push(`Error en ${usuario.fila}, longitud maximo para materno es 255 letras`);
          }
          if (direccion.length > 255) {
            usuario.errores.push(`Error en ${usuario.fila}, longitud maximo para direccion es 255 letras`);
          }
      } else {
        let mensajeError = [];

        if (!dni) {
          mensajeError.push('dni');
        }
        if (!nombres) {
          mensajeError.push('nombres');
        }
        if (!paterno) {
          mensajeError.push('paterno');
        }
        if (!materno) {
          mensajeError.push('materno');
        }
        if (!direccion) {
          mensajeError.push('direccion');
        }
        if (!codigoMedidor) {
          mensajeError.push('cod. medidor o nro. predio');
        }
        if (!codigoDistrito) {
          mensajeError.push('cod. distrito');
        }

        usuario.errores.push(`Datos incompletos para fila ${usuario.fila}, verifique: ${mensajeError.join(',')}`);
      }

      if (!usuario.errores || usuario.errores.length === 0) {
        try {
          // Registramos o actualizamos usuarios
          console.log(`DNI: ${dni}, HASH: ${LONGITUD_HASH}`);

          const hashedClave = await bcrypt.hash(dni, LONGITUD_HASH);
          const existeUsuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);
          if (!existeUsuario) {
            const idUsuario = await usuarioRepositorio.crearUsuario({ 
              dni,
              nombres,
              paterno,
              materno,
              direccion,
              codigoDistrito,
              codigoCentroPoblado,
              codigoComunidadCampesina,
              codigoComunidadNativa,
              clave: hashedClave,
              estado: UsuarioEstados.ACTIVO
            });
            usuario.id = idUsuario;
          } else {
            const usuarioActualizado = await usuarioRepositorio.actualizarUsuario({ 
              dni,
              nombres,
              paterno,
              materno,
              direccion,
              codigoDistrito,
              codigoCentroPoblado,
              codigoComunidadCampesina,
              codigoComunidadNativa,
              estado: UsuarioEstados.ACTIVO
            });
            usuario.id = existeUsuario.idUsuario;
          }
          usuario.dni = dni; // dni validato
          usuario.codigoMedidor = codigoMedidor; // codigo medidor validado
        } catch(error) {
          usuario.errores.push(`Error en la fila ${usuario.fila}, datos validos pero no se pudo guardar, intente nuevamente.`);
        }
      }
    });

    return usuarios;
  }
}

export default new UsuarioServicio();

