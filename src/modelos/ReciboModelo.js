/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class ReciboModelo {

    constructor({ idLectura, idMedidor, codigoMedidor, lecturaActual, lecturaAnterior, 
                  m3Consumido, montoPagar, 
                  numeroRecibo, fechaLimitePago, fechaLectura,
                  comentario, estado,
                  usuario, direccion,
                  deudaAnterior, deudaActual,
                  tarifa, m3Tarifa
                }) {
      this.idLectura = idLectura;
      this.idMedidor = idMedidor;
      this.codigoMedidor = codigoMedidor;
      this.usuario = usuario;
      this.direccion = direccion;
      this.lecturaActual = lecturaActual;
      this.lecturaAnterior = lecturaAnterior;
      this.m3Consumido = m3Consumido;
      this.montoPagar = montoPagar;
      this.numeroRecibo = numeroRecibo;
      this.fechaLimitePago = fechaLimitePago;
      this.fechaLectura = fechaLectura;
      this.comentario = comentario;
      this.estado = estado;
      this.deudaAnterior = deudaAnterior;
      this.deudaActual = deudaActual;
      this.tarifa = tarifa;
      this.m3Tarifa = m3Tarifa;
    }

    obtenerMes() {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        const [anio, mes, dia] = this.fechaLectura.split("-");
        return meses[parseInt(mes, 10) - 1];
    }

    obtenerPeriodo() {
        const [anio, mes, dia] = this.fechaLectura.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    obtenerFechaLimite() {
        const [anio, mes, dia] = this.fechaLimitePago.split("-");
        return `${dia}/${mes}/${anio}`;
    }
  
  }
  
  export default ReciboModelo;
  
  