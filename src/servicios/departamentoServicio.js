/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

