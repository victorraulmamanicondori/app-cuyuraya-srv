import centroPobladoRepositorio from '../repositorios/centroPobladoRepositorio.js';

class CentroPobladoServicio {

  listarCentrosPobladosPorDistrito(codigoDistrito) {
    return centroPobladoRepositorio.listarCentroPobladosPorDistrito(codigoDistrito);
  }

  obtenerCentroPobladoPorId(id) {
    return centroPobladoRepositorio.obtenerCentroPobladoPorId(id);
  }

  async crearCentroPoblado(centroPoblado) {
    return centroPobladoRepositorio.crearCentroPoblado(centroPoblado);
  }

  actualizarCentroPoblado(centroPoblado) {
    return centroPobladoRepositorio.actualizarCentroPoblado(centroPoblado);
  }

  eliminarCentroPobladoPorId(id) {
    return centroPobladoRepositorio.eliminarCentroPobladoPorId(id);
  }

}

export default new CentroPobladoServicio();

