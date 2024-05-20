class LecturaModelo {
  constructor(id, idMedidor, lecturaActual, lecturaAnterior, m3Consumido, idTarifa, montoPagar, porcentajeDescuento, montoMulta, numeroRecibo, fechaLimitePago, fechaCorte, comentario, estado, fecCreacion, fecActualizacion) {
    this.id = id;
    this.idMedidor = idMedidor;
    this.lecturaActual = lecturaActual;
    this.lecturaAnterior = lecturaAnterior;
    this.m3Consumido = m3Consumido;
    this.idTarifa = idTarifa;
    this.montoPagar = montoPagar;
    this.porcentajeDescuento = porcentajeDescuento;
    this.montoMulta = montoMulta;
    this.numeroRecibo = numeroRecibo;
    this.fechaLimitePago = fechaLimitePago;
    this.fechaCorte = fechaCorte;
    this.comentario = comentario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default LecturaModelo;

