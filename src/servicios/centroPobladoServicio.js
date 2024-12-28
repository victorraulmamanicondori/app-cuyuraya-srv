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

