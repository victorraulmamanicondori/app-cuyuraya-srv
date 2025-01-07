import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';

class MedidorServicio {

  async asignarMedidor(codigoMedidor, dni) {
    const usuarioBenificiario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuarioBenificiario) {
      throw new Error(`Usuario con dni ${dni} no esta registrado, registre y luego asigne medidor`);
    }

    let existeAsignacion = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor);

    if (existeAsignacion && usuarioBenificiario.idUsuario != existeAsignacion.idUsuario) {
      const otroUsuario = await usuarioRepositorio.obtenerUsuarioPorId(existeAsignacion.idUsuario);
      throw new Error(`No se puede asignar medidor con codigo ${codigoMedidor} porque ya esta asignado a otro usuario con dni ${otroUsuario.dni}`);
    }

    const medidoresAsignados = await medidorRepositorio.obtenerMedidorPorIdUsuario(usuarioBenificiario.idUsuario);

    let codigoAsignacion = null;

    if (medidoresAsignados && medidoresAsignados.length > 0) {
      existeAsignacion = medidoresAsignados.find(medidor => medidor.codigoMedidor === codigoMedidor);

      if (existeAsignacion && existeAsignacion.codigoMedidor) {
        throw new Error(`El medidor con codigo ${codigoMedidor} ya esta asignado al usuario con dni ${dni}`);
      }
    }
    
    codigoAsignacion = await medidorRepositorio.asignarMedidor(codigoMedidor, usuarioBenificiario.idUsuario);

    if (!codigoAsignacion) {
      // Si no logra asignar, lanzar error
      throw new Error('No se pudo asignar medidor, intente nuevamente');
    }

    // Devolvemos codigo de asignacion 
    return { codigoAsignacion };
  }

  async eliminarAsignacionMedidor(codigoMedidor, dni) {
    const usuarioAsignado = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuarioAsignado) {
      throw new Error(`Usuario con dni ${dni} no esta registrado`);
    }

    await medidorRepositorio.eliminarAsignacionMedidor(codigoMedidor, usuarioAsignado.idUsuario);
    return codigoMedidor;
  }

  async obtenerMedidorPorDni(dni) {
    const usuarioBenificiario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuarioBenificiario) {
      return null;
    }

    return medidorRepositorio.obtenerMedidorPorIdUsuario(usuarioBenificiario.idUsuario);
  }

  async obtenerMedidorPorCodigo(codigoMedidor) {
    return medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor);
  }
}

export default new MedidorServicio();


