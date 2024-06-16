import sectorRepositorio from '../repositorios/sectorRepositorio.js';

class SectorServicio {

  listarSectoresPorComunidadCampesina(idComunidadCampesina) {
    return sectorRepositorio.listarSectoresPorComunidadCampesina(idComunidadCampesina);
  }

  obtenerSectorPorId(id) {
    return sectorRepositorio.obtenerSectorPorId(id);
  }

  async crearSector(sector) {
    return sectorRepositorio.crearSector(sector);
  }

  actualizarSector(sector) {
    return sectorRepositorio.actualizarSector(sector);
  }

  eliminarSectorPorId(id) {
    return sectorRepositorio.eliminarSectorPorId(id);
  }

}

export default new SectorServicio();

