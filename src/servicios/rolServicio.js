/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import rolRepositorio from '../repositorios/rolRepositorio.js';
import { RolEstados } from '../constantes/estados.js';

class RolServicio {

  listarRoles() {
    return rolRepositorio.listarRoles();
  }

  listarRolesPorUsuario(dni) {
    return rolRepositorio.listarRolesPorUsuario(dni);
  }

  obtenerRolPorId(id) {
    return rolRepositorio.obtenerRolPorId(id);
  }

  crearRol(rol) {
    rol.estado = RolEstados.ACTIVO;
    return rolRepositorio.crearRol(rol);
  }

  actualizarRol(rol) {
    return rolRepositorio.actualizarRol(rol);
  }

  eliminarRolPorId(id) {
    return rolRepositorio.eliminarRolPorId(id);
  }

}

export default new RolServicio();

