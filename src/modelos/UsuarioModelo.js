class UsuarioModelo {
  constructor({ id, nombres, paterno, materno, dni, direccion, 
    numeroContrato, telefono, clave, idRol, estado, 
    numeroIntentos, fecCreacion, fecActualizacion,
    idDepartamento, idProvincia, idDistrito, idCentroPoblado, 
    idComunidadCampesina, idSector }) {
    
    this.id = id;
    this.nombres = nombres;
    this.paterno = paterno;
    this.materno = materno;
    this.dni = dni;
    this.direccion = direccion;
    this.numeroContrato = numeroContrato;
    this.telefono = telefono;
    this.clave = clave;
    this.idRol = idRol;
    this.estado = estado;
    this.numeroIntentos = numeroIntentos;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
    this.idDepartamento = idDepartamento;
    this.idProvincia = idProvincia;
    this.idDistrito = idDistrito;
    this.idCentroPoblado = idCentroPoblado;
    this.idComunidadCampesina = idComunidadCampesina;
    this.idSector = idSector;
  }
}

export default UsuarioModelo;
