/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class CajaModelo {
  constructor({ idCaja, numeroComprobante, idTipoMovimiento, 
                fechaMovimiento, descripcion, monto, 
                idPagoRecibo, estado, fecCreacion, fecActualizacion, concepto }) {
    this.idCaja = idCaja;
    this.numeroComprobante = numeroComprobante;
    this.idTipoMovimiento = idTipoMovimiento;
    this.fechaMovimiento = fechaMovimiento;
    this.descripcion = descripcion;
    this.monto = monto;
    this.idPagoRecibo = idPagoRecibo;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
    this.concepto = concepto;
  }

  obtenerMes() {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const [dia, mes, anio] = this.fechaMovimiento.split("/");
    return meses[parseInt(mes, 10) - 1];
  }
}

export default CajaModelo;

