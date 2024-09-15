import comunidadCampesinaRepositorio from '../repositorios/comunidadCampesinaRepositorio.js';

class ComunidadCampesinaServicio {

  listarComunidadesCampesinasPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito) {
    return comunidadCampesinaRepositorio
      .listarComunidadesCampesinasPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito);
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

