class MedidorModelo {
  constructor({ idMedidor, codMedidor, idUsuario, estado, fecCreacion, fecActualizacion }) {
    this.idMedidor = idMedidor;
    this.codMedidor = codMedidor;
    this.idUsuario = idUsuario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default MedidorModelo;

