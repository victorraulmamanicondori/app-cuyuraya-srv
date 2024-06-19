class TipoMovimientoModelo {
  constructor({ idTipoMovimiento, concepto, idRubro, estado, fecCreacion, fecActualizacion }) {
    this.idTipoMovimiento = idTipoMovimiento;
    this.concepto = concepto;
    this.idRubro = idRubro;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TipoMovimientoModelo;

