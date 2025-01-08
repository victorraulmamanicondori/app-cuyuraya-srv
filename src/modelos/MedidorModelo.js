/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class MedidorModelo {
  constructor({ idMedidor, codigoMedidor, idUsuario, estado, fecCreacion, fecActualizacion }) {
    this.idMedidor = idMedidor;
    this.codigoMedidor = codigoMedidor;
    this.idUsuario = idUsuario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default MedidorModelo;

