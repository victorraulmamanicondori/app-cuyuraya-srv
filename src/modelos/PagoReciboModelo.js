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

