import comunidadNativaRepositorio from '../repositorios/comunidadNativaRepositorio.js';

class ComunidadNativaServicio {

  listarComunidadesNativasPorDistrito(codigoDistrito) {
    return comunidadNativaRepositorio.listarComunidadesNativasPorDistrito(codigoDistrito);
  }

  obtenerComunidadNativaPorCodigo(codigo) {
    return comunidadNativaRepositorio.obtenerComunidadNativaPorCodigo(codigo);
  }

  async crearComunidadNativa(comunidadNativa) {
    return comunidadNativaRepositorio.crearComunidadNativa(comunidadNativa);
  }

  actualizarComunidadNativa(comunidadNativa) {
    return comunidadNativaRepositorio.actualizarComunidadNativa(comunidadNativa);
  }

  eliminarComunidadNativaPorCodigo(codigo) {
    return comunidadNativaRepositorio.eliminarComunidadNativaPorCodigo(codigo);
  }

}

export default new ComunidadNativaServicio();

