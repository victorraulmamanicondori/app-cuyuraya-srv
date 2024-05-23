import cajaRepositorio from '../repositorios/cajaRepositorio.js';
import CajaModelo from '../modelos/CajaModelo.js';
import { CajaEstados } from '../constantes/estados.js';

class CajaServicio {

  async registrarCaja({ numeroComprobante, idTipoMovimiento, descripcion, monto, idPagoRecibo }) {
    const idCaja = await cajaRepositorio.registrarCaja({
      numeroComprobante,
      idTipoMovimiento,
      fechaMovimiento: new Date(),
      descripcion,
      monto,
      idPagoRecibo,
      estado: CajaEstados.REGISTRADO
    });

    if (!idCaja) {
      throw new Error('No se pudo registrar caja, intente nuevamente');
    }

    return { idCaja };
  }

};

export default new CajaServicio();

