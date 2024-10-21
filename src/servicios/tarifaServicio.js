import tarifaRepositorio from '../repositorios/tarifaRepositorio.js';

class TarifaServicio {

  listarTarifas() {
    return tarifaRepositorio.listarTarifas();
  }

  obtenerTarifaPorCodigo(codigoTarifa) {
    return tarifaRepositorio.obtenerTarifaPorCodigo(codigoTarifa);
  }

  async crearTarifa(tarifa) {
    return tarifaRepositorio.crearTarifa(tarifa);
  }

  actualizarTarifa(tarifa) {
    return tarifaRepositorio.actualizarTarifa(tarifa);
  }

  eliminarTarifaPorCodigo(codigoTarifa) {
    return tarifaRepositorio.eliminarTarifaPorCodigo(codigoTarifa);
  }

}

export default new TarifaServicio();
