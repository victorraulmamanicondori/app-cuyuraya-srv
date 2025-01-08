/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class PagoReciboModelo {
  constructor({ idPagoRecibo, fechaPago, montoPago, idLectura, numComprobante, estado, fecCreacion, fecActualizacion }) {
    this.idPagoRecibo = idPagoRecibo;
    this.fechaPago = fechaPago;
    this.montoPago = montoPago;
    this.idLectura = idLectura;
    this.numComprobante = numComprobante;
    this.comentario = comentario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default PagoReciboModelo;

