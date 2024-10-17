import DetectorApi from '../api/Detector.api.js';
import lecturaRepositorio from '../repositorios/lecturaRepositorio.js';
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
      throw new Error(`No se puede asignar medidor con codigo ${codigoMedidor} porque ya esta asignado`);
    }

    existeAsignacion = await medidorRepositorio.obtenerMedidorPorIdUsuario(usuarioBenificiario.idUsuario);

    let codigoAsignacion = null;

    if (!existeAsignacion) {
      codigoAsignacion = await medidorRepositorio.asignarMedidor(codigoMedidor, usuarioBenificiario.idUsuario);
    } else {
      codigoAsignacion = await medidorRepositorio.actualizarAsignacionMedidor(existeAsignacion.idMedidor, codigoMedidor, usuarioBenificiario.idUsuario);
    }

    if (!codigoAsignacion) {
      // Si no logra asignar, lanzar error
      throw new Error('No se pudo asignar medidor, intente nuevamente');
    }

    // Devolvemos codigo de asignacion 
    return { codigoAsignacion };
  }

  async detectarAnomaliasPorMedidor(codigoMedidor) {
    console.log('codigoMedidor:', codigoMedidor);

    const lecturas = await lecturaRepositorio.obtenerLecturasPorCodigoMedidor(codigoMedidor);

    console.log('Lecturas:', JSON.stringify(lecturas));

    if (lecturas && lecturas.length > 0) {
      const detectorApi = new DetectorApi();
      const resultado = await detectorApi.peticionPOST(lecturas);
      console.log('Resultado:', resultado);
      return resultado;
    }

    return null;
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


