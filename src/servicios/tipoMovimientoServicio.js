/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import rubroRepositorio from '../repositorios/rubroRepositorio.js';
import tipoMovimientoRepositorio from '../repositorios/tipoMovimientoRepositorio.js';
import { TipoMovimientoEstados, RubroEstados } from '../constantes/estados.js';

class TipoMovimientoServicio {

  async listarPorRubro(tipoRubro) {
    const rubroActivo = await rubroRepositorio.obtenerPorTipoRubroEstado(tipoRubro, RubroEstados.ACTIVO);

    if (!rubroActivo) {
      throw new Error(`Rubro ${tipoRubro} no existe`);
    }

    const tiposMovimientos = await tipoMovimientoRepositorio.listarPorRubroEstado(rubroActivo.idRubro, TipoMovimientoEstados.ACTIVO);

    return tiposMovimientos; 
  }
}

export default new TipoMovimientoServicio();

