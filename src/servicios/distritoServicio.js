import distritoRepositorio from '../repositorios/distritoRepositorio.js';

class DistritoServicio {

  listarDistritosPorProvincia(codigoProvincia) {
    return distritoRepositorio.listarDistritosPorProvincia(codigoProvincia);
  }

  obtenerDistritoPorCodigo(codigoDistrito) {
    return distritoRepositorio.obtenerDistritoPorCodigo(codigoDistrito);
  }

  async crearDistrito(distrito) {
    return distritoRepositorio.crearDistrito(distrito);
  }

  actualizarDistrito(distrito) {
    return distritoRepositorio.actualizarDistrito(distrito);
  }

  eliminarDistritoPorCodigo(codigoDistrito) {
    return distritoRepositorio.eliminarDistritoPorCodigo(codigoDistrito);
  }

}

export default new DistritoServicio();

