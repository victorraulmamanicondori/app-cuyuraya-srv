class TarifaModelo {
  constructor(id, codigoTarifa, descripcion, montoTarifa, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.codigoTarifa = codigoTarifa;
    this.descripcion = descripcion;
    this.montoTarifa = montoTarifa;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TarifaModelo;

