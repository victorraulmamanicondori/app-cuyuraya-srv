class TipoMovimientoModelo {
  constructor(id, concepto, idRubro, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.concepto = concepto;
    this.idRubro = idRubro;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TipoMovimientoModelo;

