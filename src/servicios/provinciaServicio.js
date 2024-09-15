import provinciaRepositorio from '../repositorios/provinciaRepositorio.js';

class ProvinciaServicio {

  listarProvinciasPorDepartamento(codigoDepartamento) {
    return provinciaRepositorio.listarProvinciasPorDepartamento(codigoDepartamento);
  }

  obtenerProvinciaPorCodigo(codigoDepartamento, codigoProvincia) {
    return provinciaRepositorio
      .obtenerProvinciaPorCodigo(codigoDepartamento, codigoProvincia);
  }

  async crearProvincia(provincia) {
    return provinciaRepositorio.crearProvincia(provincia);
  }

  actualizarProvincia(provincia) {
    return provinciaRepositorio.actualizarProvincia(provincia);
  }

  eliminarProvinciaPorCodigo(codigoDepartamento, codigoProvincia) {
    return provinciaRepositorio
      .eliminarProvinciaPorCodigo(codigoDepartamento, codigoProvincia);
  }

}

export default new ProvinciaServicio();

