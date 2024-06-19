class TarifaModelo {
  constructor({ idTarifa, codigoTarifa, descripcion, montoTarifa, estado, fecCreacion, fecActualizacion }) {
    this.idTarifa = idTarifa;
    this.codigoTarifa = codigoTarifa;
    this.descripcion = descripcion;
    this.montoTarifa = montoTarifa;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TarifaModelo;

