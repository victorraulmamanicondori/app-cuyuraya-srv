class TarifaModelo {
  constructor(id, descripcion, montoTarifa, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.descripcion = descripcion;
    this.montoTarifa = montoTarifa;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TarifaModelo;

