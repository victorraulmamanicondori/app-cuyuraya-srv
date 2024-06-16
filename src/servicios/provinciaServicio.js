import provinciaRepositorio from '../repositorios/provinciaRepositorio.js';

class ProvinciaServicio {

  listarProvinciasPorDepartamento(codigoDepartamento) {
    return provinciaRepositorio.listarProvinciasPorDepartamento(codigoDepartamento);
  }

  obtenerProvinciaPorCodigo(codigo) {
    return provinciaRepositorio.obtenerProvinciaPorCodigo(codigo);
  }

  async crearProvincia(provincia) {
    return provinciaRepositorio.crearProvincia(provincia);
  }

  actualizarProvincia(provincia) {
    return provinciaRepositorio.actualizarProvincia(provincia);
  }

  eliminarProvinciaPorCodigo(codigo) {
    return provinciaRepositorio.eliminarProvinciaPorCodigo(codigo);
  }

}

export default new ProvinciaServicio();

