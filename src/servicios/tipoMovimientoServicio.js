import rubroRepositorio from '../repositorios/rubroRepositorio.js';
import tipoMovimientoRepositorio from '../repositorios/tipoMovimientoRepositorio.js';
import { TipoMovimientoEstados, RubroEstados } from '../constantes/estados.js';

class TipoMovimientoServicio {

  async listarPorRubro(tipoRubro) {
    const rubroActivo = await rubroRepositorio.obtenerPorTipoRubroEstado(tipoRubro, RubroEstados.ACTIVO);

    if (!rubroActivo) {
      throw new Error(`Rubro ${tipoRubro} no existe`);
    }

    const tiposMovimientos = await tipoMovimientoRepositorio.listarPorRubroEstado(rubroActivo.id, TipoMovimientoEstados.ACTIVO);

    return tiposMovimientos; 
  }
}

export default new TipoMovimientoServicio();

