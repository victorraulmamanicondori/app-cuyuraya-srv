import departamentoRepositorio from '../repositorios/departamentoRepositorio.js';

class DepartamentoServicio {

  listarDepartamentos() {
    return departamentoRepositorio.listarDepartamentos();
  }

  obtenerDepartamentoPorId(id) {
    return departamentoRepositorio.obtenerDepartamentoPorId(id);
  }

  async crearDepartamento(departamento) {
    return departamentoRepositorio.crearDepartamento(departamento);
  }

  actualizarDepartamento(departamento) {
    return departamentoRepositorio.actualizarDepartamento(departamento);
  }

  eliminarDepartamentoPorId(id) {
    return departamentoRepositorio.eliminarDepartamentoPorId(id);
  }

}

export default new DepartamentoServicio();

