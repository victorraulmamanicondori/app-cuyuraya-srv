import centroPobladoRepositorio from '../repositorios/centroPobladoRepositorio.js';

class CentroPobladoServicio {

  listarCentrosPobladosPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito) {
    return centroPobladoRepositorio.listarCentroPobladosPorDistrito(codigoDepartamento, codigoProvincia, codigoDistrito);
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

