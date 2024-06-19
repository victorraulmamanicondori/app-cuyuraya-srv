class CajaModelo {
  constructor({ idCaja, numeroComprobante, idTipoMovimiento, 
                fechaMovimiento, descripcion, monto, 
                idPagoRecibo, estado, fecCreacion, fecActualizacion }) {
    this.idCaja = idCaja;
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

