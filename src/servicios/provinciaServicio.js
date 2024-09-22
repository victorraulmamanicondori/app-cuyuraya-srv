import provinciaRepositorio from '../repositorios/provinciaRepositorio.js';

class ProvinciaServicio {

  listarProvinciasPorDepartamento(codigoDepartamento) {
    return provinciaRepositorio.listarProvinciasPorDepartamento(codigoDepartamento);
  }

  obtenerProvinciaPorCodigo(codigoProvincia) {
    return provinciaRepositorio.obtenerProvinciaPorCodigo(codigoProvincia);
  }

  async crearProvincia(provincia) {
    return provinciaRepositorio.crearProvincia(provincia);
  }

  actualizarProvincia(provincia) {
    return provinciaRepositorio.actualizarProvincia(provincia);
  }

  eliminarProvinciaPorCodigo(codigoProvincia) {
    return provinciaRepositorio.eliminarProvinciaPorCodigo(codigoProvincia);
  }

}

export default new ProvinciaServicio();

