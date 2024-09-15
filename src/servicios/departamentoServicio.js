import departamentoRepositorio from '../repositorios/departamentoRepositorio.js';

class DepartamentoServicio {

  listarDepartamentos() {
    return departamentoRepositorio.listarDepartamentos();
  }

  obtenerDepartamentoPorCodigo(codigoDepartamento) {
    return departamentoRepositorio.obtenerDepartamentoPorCodigo(codigoDepartamento);
  }

  async crearDepartamento(departamento) {
    return departamentoRepositorio.crearDepartamento(departamento);
  }

  actualizarDepartamento(departamento) {
    return departamentoRepositorio.actualizarDepartamento(departamento);
  }

  eliminarDepartamentoPorCodigo(codigoDepartamento) {
    return departamentoRepositorio.eliminarDepartamentoPorCodigo(codigoDepartamento);
  }

}

export default new DepartamentoServicio();

