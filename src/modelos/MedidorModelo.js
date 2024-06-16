class MedidorModelo {
  constructor({ id, codMedidor, idUsuario, estado, fecCreacion, fecActualizacion }) {
    this.id = id;
    this.codMedidor = codMedidor;
    this.idUsuario = idUsuario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default MedidorModelo;

