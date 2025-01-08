/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import tarifaRepositorio from '../repositorios/tarifaRepositorio.js';

class TarifaServicio {

  listarTarifas() {
    return tarifaRepositorio.listarTarifas();
  }

  obtenerTarifaPorCodigo(codigoTarifa) {
    return tarifaRepositorio.obtenerTarifaPorCodigo(codigoTarifa);
  }

  async crearTarifa(tarifa) {
    const existeTarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(tarifa.codigoTarifa);

    if (existeTarifa) {
        throw new Error("Ya existe tarifa con codigo " + tarifa.codigoTarifa);
    }

    return tarifaRepositorio.crearTarifa(tarifa);
  }

  async actualizarTarifa(tarifa) {
    const existeTarifa = await tarifaRepositorio.obtenerTarifaPorCodigo(tarifa.codigoTarifa);

    if (!existeTarifa) {
        throw new Error("No existe tarifa con codigo " + tarifa.codigoTarifa);
    }

    return tarifaRepositorio.actualizarTarifa(tarifa);
  }

  eliminarTarifaPorCodigo(codigoTarifa) {
    return tarifaRepositorio.eliminarTarifaPorCodigo(codigoTarifa);
  }

}

export default new TarifaServicio();
