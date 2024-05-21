import medidorRepositorio from '../repositorios/medidorRepositorio.js';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';

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

    const codigoAsignacion = await medidorRepositorio.asignarMedidor(codigoMedidor, usuarioBenificiario.id);

    if (!codigoAsignacion) {
      // Si no logra asignar, lanzar error
      throw new Error('No se pudo asignar medidor, intente nuevamente');
    }

    // Devolvemos codigo de asignacion 
    return { codigoAsignacion };
  }
}

export default new MedidorServicio();


