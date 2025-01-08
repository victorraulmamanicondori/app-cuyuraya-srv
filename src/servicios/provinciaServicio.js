/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

