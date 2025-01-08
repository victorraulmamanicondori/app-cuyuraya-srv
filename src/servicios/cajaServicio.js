/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

  async listarCajaPorRubro(tipoRubro) {
    const resultadoCaja = await cajaRepositorio.listarCajaPorRubro(tipoRubro);

    return resultadoCaja;
  }

};

export default new CajaServicio();

