/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

