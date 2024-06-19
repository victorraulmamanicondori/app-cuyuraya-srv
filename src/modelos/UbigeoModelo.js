class UbigeoModelo {
  constructor({ idUbigeo,
    idDepartamento, idProvincia, idDistrito, 
    idCentroPoblado, idComunidadCampesina, idSector,
    fecCreacion, fecActualizacion }) {
    
    this.idUbigeo = idUbigeo;
    this.idDepartamento = idDepartamento;
    this.idProvincia = idProvincia;
    this.idDistrito = idDistrito;
    this.idCentroPoblado = idCentroPoblado;
    this.idComunidadCampesina = idComunidadCampesina;
    this.idSector = idSector;
    this.fecCreacion = fecCreacion;
    this.fecActualizacion = fecActualizacion;
  }
}

export default UbigeoModelo;
