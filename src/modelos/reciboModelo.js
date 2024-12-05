class ReciboModelo {

    constructor({ idLectura, idMedidor, lecturaActual, lecturaAnterior, 
                  m3Consumido, montoPagar, 
                  numeroRecibo, fechaLimitePago, fechaLectura,
                  comentario, estado,
                  usuario,
                  deudaAnterior, deudaActual
                }) {
      this.idLectura = idLectura;
      this.idMedidor = idMedidor;
      this.codigoMedidor = codigoMedidor;
      this.usuario = usuario;
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
    }

    obtenerMes() {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        const [dia, mes, anio] = this.fechaLectura.split("/");
        return meses[parseInt(mes, 10) - 1];
    }

    obtenerPeriodo() {
        const [dia, mes, anio] = this.fechaLectura.split("/");
        return `${dia}/${mes}/${anio}`;
    }
  
  }
  
  export default ReciboModelo;
  
  