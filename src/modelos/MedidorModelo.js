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

