/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class TipoMovimientoModelo {
  constructor({ idTipoMovimiento, concepto, idRubro, estado, fecCreacion, fecActualizacion }) {
    this.idTipoMovimiento = idTipoMovimiento;
    this.concepto = concepto;
    this.idRubro = idRubro;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default TipoMovimientoModelo;

