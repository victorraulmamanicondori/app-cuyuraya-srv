import comunidadCampesinaRepositorio from '../repositorios/comunidadCampesinaRepositorio.js';

class ComunidadCampesinaServicio {

  listarComunidadesCampesinasPorDistrito(codigoDistrito) {
    return comunidadCampesinaRepositorio.listarComunidadesCampesinasPorDistrito(codigoDistrito);
  }

  obtenerComunidadCampesinaPorCodigo(codigo) {
    return comunidadCampesinaRepositorio.obtenerComunidadCampesinaPorCodigo(codigo);
  }

  async crearComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.crearComunidadCampesina(comunidadCampesina);
  }

  actualizarComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.actualizarComunidadCampesina(comunidadCampesina);
  }

  eliminarComunidadCampesinaPorCodigo(codigo) {
    return comunidadCampesinaRepositorio.eliminarComunidadCampesinaPorCodigo(codigo);
  }

}

export default new ComunidadCampesinaServicio();

