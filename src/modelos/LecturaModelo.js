class LecturaModelo {

  constructor({ idLectura, idMedidor, lecturaActual, lecturaAnterior, 
                m3Consumido, idTarifa, montoPagar, porcentajeDescuento, 
                montoMulta, numeroRecibo, fechaLimitePago, fechaCorte, fechaLectura,
                comentario, estado, fecCreacion, fecActualizacion }) {
    this.idLectura = idLectura;
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
    this.fechaLectura = fechaLectura;
    this.comentario = comentario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }

}

export default LecturaModelo;

