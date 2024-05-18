class HistoricoLoginModelo {
  constructor(id, idUsuario, dni, accion, fecCreacion) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.dni = dni;
    this.accion = accion;
    this.fecCreacion = fecCreacion;
  }
}

module.exports = HistoricoLoginModelo;

