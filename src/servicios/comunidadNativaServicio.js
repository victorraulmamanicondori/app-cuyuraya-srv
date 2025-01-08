/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import comunidadNativaRepositorio from '../repositorios/comunidadNativaRepositorio.js';

class ComunidadNativaServicio {

  listarComunidadesNativasPorDistrito(codigoDistrito) {
    return comunidadNativaRepositorio.listarComunidadesNativasPorDistrito(codigoDistrito);
  }

  obtenerComunidadNativaPorCodigo(codigo) {
    return comunidadNativaRepositorio.obtenerComunidadNativaPorCodigo(codigo);
  }

  async crearComunidadNativa(comunidadNativa) {
    return comunidadNativaRepositorio.crearComunidadNativa(comunidadNativa);
  }

  actualizarComunidadNativa(comunidadNativa) {
    return comunidadNativaRepositorio.actualizarComunidadNativa(comunidadNativa);
  }

  eliminarComunidadNativaPorCodigo(codigo) {
    return comunidadNativaRepositorio.eliminarComunidadNativaPorCodigo(codigo);
  }

}

export default new ComunidadNativaServicio();

