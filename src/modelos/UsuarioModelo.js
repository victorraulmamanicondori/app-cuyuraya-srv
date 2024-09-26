class UsuarioModelo {
  constructor({ idUsuario, nombres, paterno, materno, dni, direccion, 
    numeroContrato, telefono, clave, idUbigeo, estado,
    codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa,
    numeroIntentos, fecCreacion, fecActualizacion,
    }) {
    
    this.idUsuario = idUsuario;
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
    this.codigoDistrito = codigoDistrito;
    this.codigoCentroPoblado = codigoCentroPoblado;
    this.codigoComunidadCampesina = codigoComunidadCampesina;
    this.codigoComunidadNativa = codigoComunidadNativa;
    this.numeroIntentos = numeroIntentos;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default UsuarioModelo;
