import rolRepositorio from '../repositorios/rolRepositorio.js';
import { RolEstados } from '../constantes/estados.js';

class RolServicio {

  listarRoles() {
    return rolRepositorio.listarRoles();
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

