/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class TarifaModelo {
  constructor({ idTarifa, codigoTarifa, descripcion, montoTarifa, m3Consumo, montoExtraPorM3, estado, fecCreacion, fecActualizacion }) {
    this.idTarifa = idTarifa;
    this.codigoTarifa = codigoTarifa;
    this.descripcion = descripcion;
    this.montoTarifa = montoTarifa;
    this.m3Consumo = m3Consumo;
    this.montoExtraPorM3 = montoExtraPorM3;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TarifaModelo;

