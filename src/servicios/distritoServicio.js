import distritoRepositorio from '../repositorios/distritoRepositorio.js';

class DistritoServicio {

  listarDistritosPorProvincia(codigoProvincia) {
    return distritoRepositorio.listarDistritosPorProvincia(codigoProvincia);
  }

  obtenerDistritoPorCodigo(codigo) {
    return distritoRepositorio.obtenerDistritoPorCodigo(codigo);
  }

  async crearDistrito(distrito) {
    return distritoRepositorio.crearDistrito(distrito);
  }

  actualizarDistrito(distrito) {
    return distritoRepositorio.actualizarDistrito(distrito);
  }

  eliminarDistritoPorCodigo(codigo) {
    return distritoRepositorio.eliminarDistritoPorCodigo(codigo);
  }

}

export default new DistritoServicio();

