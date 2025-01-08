/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import comunidadCampesinaRepositorio from '../repositorios/comunidadCampesinaRepositorio.js';

class ComunidadCampesinaServicio {

  listarComunidadesCampesinasPorDistrito(codigoDistrito) {
    return comunidadCampesinaRepositorio.listarComunidadesCampesinasPorDistrito(codigoDistrito);
  }

  obtenerComunidadCampesinaPorCodigo(codigo) {
    return comunidadCampesinaRepositorio.obtenerComunidadCampesinaPorCodigo(codigo);
  }

  async crearComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.crearComunidadCampesina(comunidadCampesina);
  }

  actualizarComunidadCampesina(comunidadCampesina) {
    return comunidadCampesinaRepositorio.actualizarComunidadCampesina(comunidadCampesina);
  }

  eliminarComunidadCampesinaPorCodigo(codigo) {
    return comunidadCampesinaRepositorio.eliminarComunidadCampesinaPorCodigo(codigo);
  }

}

export default new ComunidadCampesinaServicio();

