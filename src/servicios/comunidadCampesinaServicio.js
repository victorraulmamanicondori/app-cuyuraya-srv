import comunidadCampesinaRepositorio from '../repositorios/comunidadCampesinaRepositorio.js';

class ComunidadCampesinaServicio {

  listarComunidadesCampesinasPorDistrito(codigoDistrito) {
    return comunidadCampesinaRepositorio.listarComunidadesCampesinasPorDistrito(codigoDistrito);
  }

  obtenerComunidadCampesinaPorId(id) {
    return comunidadCampesinaRepositorio.obtenerComunidadCampesinaPorId(id);
  }

  async crearComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.crearComunidadCampesina(comunidadCampesina);
  }

  actualizarComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.actualizarComunidadCampesina(comunidadCampesina);
  }

  eliminarComunidadCampesinaPorId(id) {
    return comunidadCampesinaRepositorio.eliminarComunidadCampesinaPorId(id);
  }

}

export default new ComunidadCampesinaServicio();

