/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import permisoRepositorio from '../repositorios/permisoRepositorio.js';

class PermisoServicio {

  listarPermisos() {
    return permisoRepositorio.listarPermisos();
  }

  listarPermisosPorRol(idRol) {
    return permisoRepositorio.listarPermisosPorRol(idRol);
  }

  listarPermisosPorUsuario(dni) {
    return permisoRepositorio.listarPermisosPorUsuario(dni);
  }

  obtenerPermisoPorId(id) {
    return permisoRepositorio.obtenerPermisoPorId(id);
  }

  crearPermiso(Permiso) {
    return permisoRepositorio.crearPermiso(Permiso);
  }

  actualizarPermiso(Permiso) {
    return permisoRepositorio.actualizarPermiso(Permiso);
  }

  eliminarPermisoPorId(id) {
    return permisoRepositorio.eliminarPermisoPorId(id);
  }

}

export default new PermisoServicio();

