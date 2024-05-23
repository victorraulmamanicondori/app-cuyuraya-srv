class CajaModelo {
  constructor(id, numeroComprobante, idTipoMovimiento, fechaMovimiento, descripcion, monto, idPagoRecibo, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.numeroComprobante = numeroComprobante;
    this.idTipoMovimiento = idTipoMovimiento;
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

