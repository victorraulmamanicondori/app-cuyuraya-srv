/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import centroPobladoRepositorio from '../repositorios/centroPobladoRepositorio.js';

class CentroPobladoServicio {

  listarCentrosPobladosPorDistrito(codigoDistrito) {
    return centroPobladoRepositorio.listarCentroPobladosPorDistrito(codigoDistrito);
  }

  obtenerCentroPobladoPorCodigo(codigoCentroPoblado) {
    return centroPobladoRepositorio.obtenerCentroPobladoPorCodigo(codigoCentroPoblado);
  }

  async crearCentroPoblado(centroPoblado) {
    return centroPobladoRepositorio.crearCentroPoblado(centroPoblado);
  }

  actualizarCentroPoblado(centroPoblado) {
    return centroPobladoRepositorio.actualizarCentroPoblado(centroPoblado);
  }

  eliminarCentroPobladoPorCodigo(codigoCentroPoblado) {
    return centroPobladoRepositorio.eliminarCentroPobladoPorCodigo(codigoCentroPoblado);
  }

}

export default new CentroPobladoServicio();

