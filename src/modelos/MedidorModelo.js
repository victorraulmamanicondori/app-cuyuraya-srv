class MedidorModelo {
  constructor(id, codMedidor, idUsuario, estado, fecCreacion, fecActualizaciond) {
    this.id = id;
    this.codMedidor = codMedidor;
    this.idUsuario = idUsuario;
    this.estado = estado;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

module.exports = MedidorModelo;

