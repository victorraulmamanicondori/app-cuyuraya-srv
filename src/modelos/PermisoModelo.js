/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

class PermisoModelo {
    constructor({ idPermiso, nombre, descripcion, fecCreacion, fecActualizacion }) {
        this.idPermiso = idPermiso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecCreacion = fecCreacion;
        this.fecActualizacion = fecActualizacion;
    }
}

export default PermisoModelo;
