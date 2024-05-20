class CajaModelo {
  constructor(id, numComprobante, idTipoMov, fechaMovimiento, descripcion, monto, idPagoRecibo, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.numComprobante = numComprobante;
    this.idTipoMov = idTipoMov;
    this.fechaMovimiento = fechaMovimiento;
    this.descripcion = descripcion;
    this.monto = monto;
    this.idPagoRecibo = idPagoRecibo;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default CajaModelo;

