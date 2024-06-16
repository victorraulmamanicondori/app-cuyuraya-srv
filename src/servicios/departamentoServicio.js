import departamentoRepositorio from '../repositorios/departamentoRepositorio.js';

class DepartamentoServicio {

  listarDepartamentos() {
    return departamentoRepositorio.listarDepartamentos();
  }

  obtenerDepartamentoPorCodigo(codigo) {
    return departamentoRepositorio.obtenerDepartamentoPorCodigo(codigo);
  }

  async crearDepartamento(departamento) {
    return departamentoRepositorio.crearDepartamento(departamento);
  }

  actualizarDepartamento(departamento) {
    return departamentoRepositorio.actualizarDepartamento(departamento);
  }

  eliminarDepartamentoPorCodigo(codigo) {
    return departamentoRepositorio.eliminarDepartamentoPorCodigo(codigo);
  }

}

export default new DepartamentoServicio();

