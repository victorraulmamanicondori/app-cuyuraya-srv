class UsuarioModelo {
  constructor({ id, nombres, paterno, materno, dni, direccion, 
    numeroContrato, telefono, clave, idUbigeo, estado, 
    numeroIntentos, fecCreacion, fecActualizacion,
    }) {
    
    this.id = id;
    this.nombres = nombres;
    this.paterno = paterno;
    this.materno = materno;
    this.dni = dni;
    this.direccion = direccion;
    this.numeroContrato = numeroContrato;
    this.telefono = telefono;
    this.clave = clave;
    this.idUbigeo = idUbigeo;
    this.estado = estado;
    this.numeroIntentos = numeroIntentos;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default UsuarioModelo;
