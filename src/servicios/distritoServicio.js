import distritoRepositorio from '../repositorios/distritoRepositorio.js';

class DistritoServicio {

  listarDistritosPorProvincia(codigoDepartamento, codigoProvincia) {
    return distritoRepositorio.listarDistritosPorProvincia(codigoDepartamento, codigoProvincia);
  }

  obtenerDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito) {
    return distritoRepositorio
      .obtenerDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito);
  }

  async crearDistrito(distrito) {
    return distritoRepositorio.crearDistrito(distrito);
  }

  actualizarDistrito(distrito) {
    return distritoRepositorio.actualizarDistrito(distrito);
  }

  eliminarDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito) {
    return distritoRepositorio
      .eliminarDistritoPorCodigo(codigoDepartamento, codigoProvincia, codigoDistrito);
  }

}

export default new DistritoServicio();

