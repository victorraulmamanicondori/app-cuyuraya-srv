class PagoReciboModelo {
  constructor({ id, fechaPago, montoPago, idLectura, numComprobante, estado, fecCreacion, fecActualizacion }) {
    this.id = id;
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

