/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import distritoRepositorio from '../repositorios/distritoRepositorio.js';

class DistritoServicio {

  listarDistritosPorProvincia(codigoProvincia) {
    return distritoRepositorio.listarDistritosPorProvincia(codigoProvincia);
  }

  obtenerDistritoPorCodigo(codigoDistrito) {
    return distritoRepositorio.obtenerDistritoPorCodigo(codigoDistrito);
  }

  async crearDistrito(distrito) {
    return distritoRepositorio.crearDistrito(distrito);
  }

  actualizarDistrito(distrito) {
    return distritoRepositorio.actualizarDistrito(distrito);
  }

  eliminarDistritoPorCodigo(codigoDistrito) {
    return distritoRepositorio.eliminarDistritoPorCodigo(codigoDistrito);
  }

}

export default new DistritoServicio();

