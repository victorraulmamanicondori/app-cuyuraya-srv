import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';
import lecturaRepositorio from '../repositorios/lecturaRepositorio.js';
import DetectorApi from '../api/Detector.api.js';

class MedidorServicio {

  async asignarMedidor(codigoMedidor, dni) {
    const usuarioBenificiario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuarioBenificiario) {
      throw new Error(`Usuario con dni ${dni} no esta registrado, registre y luego asigne medidor`);
    }

    const existeAsignacion = await medidorRepositorio.obtenerMedidorPorCodigo(codigoMedidor);

    if (existeAsignacion) {
      throw new Error(`No se puede asignar medidor con codigo ${codigoMedidor} porque ya esta asignado`);
    }

    const codigoAsignacion = await medidorRepositorio.asignarMedidor(codigoMedidor, usuarioBenificiario.idUsuario);

    if (!codigoAsignacion) {
      // Si no logra asignar, lanzar error
      throw new Error('No se pudo asignar medidor, intente nuevamente');
    }

    // Devolvemos codigo de asignacion 
    return { codigoAsignacion };
  }

  async detectarAnomaliasPorMedidor(idMedidor) {
    console.log('idMedidor:', idMedidor);

    const lecturas = await lecturaRepositorio.obtenerLecturasPorIdMedidor(idMedidor);

    console.log('Lecturas:', JSON.stringify(lecturas));

    if (lecturas && lecturas.length > 0) {
      const detectorApi = new DetectorApi();
      const resultado = await detectorApi.peticionPOST(lecturas);
      console.log('Resultado:', resultado);
      return resultado;
    }

    return null;
  }
}

export default new MedidorServicio();


