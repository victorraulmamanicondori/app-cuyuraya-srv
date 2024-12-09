import pool from '../config/db.js';
import logger from '../config/logger.js';
import {UsuarioEstados} from '../constantes/estados.js';
import UsuarioModelo from '../modelos/UsuarioModelo.js';

class UsuarioRepositorio {

  async listarUsuarios() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_USUARIO ORDER BY PATERNO ASC");
      return filas.map(fila => new UsuarioModelo({
                                    idUsuario: fila.ID_USUARIO.toString(),
                                    nombres: fila.NOMBRES,
                                    paterno: fila.PATERNO,
                                    materno: fila.MATERNO,
                                    dni: fila.DNI,
                                    direccion: fila.DIRECCION,
                                    numeroContrato: fila.NUM_CONTRATO,
                                    telefono: fila.TELEFONO,
                                    clave: fila.CLAVE,
                                    estado: fila.ESTADO,
                                    codigoDistrito: fila.COD_DISTRITO,
                                    codigoCentroPoblado: fila.COD_CENTRO_POBLADO,
                                    codigoComunidadCampesina: fila.COD_COMUNIDAD_CAMPESINA,
                                    codigoComunidadNativa: fila.COD_COMUNIDAD_NATIVA,
                                    fecCreacion: fila.FEC_CREACION,
                                    fecActualizacion: fila.FEC_ACTUALIZACION
                                }));
    } catch(error) {
      logger.error(`Error al listar usuarios:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerUsuarioPorDni(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_USUARIO WHERE DNI = ?", [dni]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new UsuarioModelo({
                                    idUsuario: fila.ID_USUARIO.toString(),
                                    nombres: fila.NOMBRES,
                                    paterno: fila.PATERNO,
                                    materno: fila.MATERNO,
                                    dni: fila.DNI,
                                    direccion: fila.DIRECCION,
                                    numeroContrato: fila.NUM_CONTRATO,
                                    telefono: fila.TELEFONO,
                                    clave: fila.CLAVE,
                                    estado: fila.ESTADO,
                                    codigoDistrito: fila.COD_DISTRITO,
                                    codigoCentroPoblado: fila.COD_CENTRO_POBLADO,
                                    codigoComunidadCampesina: fila.COD_COMUNIDAD_CAMPESINA,
                                    codigoComunidadNativa: fila.COD_COMUNIDAD_NATIVA,
                                    fecCreacion: fila.FEC_CREACION,
                                    fecActualizacion: fila.FEC_ACTUALIZACION
                                  });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener usuario por dni:${dni}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa) {
    let conexion;
    try {
      const codigos = [codigoDistrito]
      let WHERE = " WHERE U.COD_DISTRITO = ? "

      if (codigoCentroPoblado && codigoCentroPoblado.length > 0) {
        codigos.push(codigoCentroPoblado)
        WHERE += " AND U.COD_CENTRO_POBLADO = ? "
      } else if (codigoComunidadCampesina && codigoComunidadCampesina.length > 0) {
        codigos.push(codigoComunidadCampesina)
        WHERE += " AND U.COD_COMUNIDAD_CAMPESINA = ? "
      } else if (codigoComunidadNativa && codigoComunidadNativa.length > 0) {
        codigos.push(codigoComunidadNativa)
        WHERE += " AND U.COD_COMUNIDAD_NATIVA = ? "
      }

      conexion = await pool.getConnection();
      const filas = await conexion.query(`SELECT 
                                            U.ID_USUARIO,
                                            U.NOMBRES,
                                            U.PATERNO,
                                            U.MATERNO,
                                            U.DNI, 
                                            M.COD_MEDIDOR,
                                            U.NUM_CONTRATO,
                                            U.DIRECCION,
                                            U.TELEFONO,
                                            U.ESTADO
                                          FROM TBL_USUARIO AS U 
                                          LEFT JOIN TBL_MEDIDOR AS M 
                                          ON M.ID_USUARIO = U.ID_USUARIO 
                                          ${WHERE}
                                          GROUP BY U.ID_USUARIO,
                                                   U.NOMBRES,
                                                   U.PATERNO,
                                                   U.MATERNO,
                                                   U.DNI,
                                                   M.COD_MEDIDOR
                                          ORDER BY PATERNO ASC,
                                                   MATERNO ASC,
                                                   NOMBRES ASC`,
                                        codigos);
      return filas.map(fila => { 
          const usuario = new UsuarioModelo({
                                      idUsuario: fila.ID_USUARIO.toString(),
                                      nombres: fila.NOMBRES,
                                      paterno: fila.PATERNO,
                                      materno: fila.MATERNO,
                                      dni: fila.DNI,
                                      numeroContrato: fila.NUM_CONTRATO,
                                      direccion: fila.DIRECCION,
                                      telefono: fila.TELEFONO,
                                      estado: fila.ESTADO
                                  });
          usuario.codigoMedidor = fila.COD_MEDIDOR;
          return usuario;
      });
    } catch(error) {
      logger.error(`Error al listar usuarios:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearUsuario(usuario) {
    let conexion;
    try {
      logger.info(`Registradon usuario: ${JSON.stringify(usuario)}`);

      conexion = await pool.getConnection();
      const resultado = await conexion.query(`INSERT INTO TBL_USUARIO (NOMBRES,
                                                                       PATERNO,
                                                                       MATERNO,
                                                                       DNI,
                                                                       DIRECCION,
                                                                       NUM_CONTRATO,
                                                                       TELEFONO,
                                                                       CLAVE,
                                                                       COD_DISTRITO,
                                                                       COD_CENTRO_POBLADO,
                                                                       COD_COMUNIDAD_CAMPESINA,
                                                                       COD_COMUNIDAD_NATIVA,
                                                                       ESTADO)
                                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                     [usuario.nombres,
                                                      usuario.paterno,
                                                      usuario.materno,
                                                      usuario.dni,
                                                      usuario.direccion,
                                                      usuario.numeroContrato,
                                                      usuario.telefono,
                                                      usuario.clave,
                                                      usuario.codigoDistrito,
                                                      usuario.codigoCentroPoblado,
                                                      usuario.codigoComunidadCampesina,
                                                      usuario.codigoComunidadNativa,
                                                      usuario.estado]);
      usuario.id = resultado.insertId.toString();
      return usuario;
    } catch(error) {
      logger.error(`Error al crear usuario:${error}`);
      throw new Error('Error al crear usuario');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarUsuario(usuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_USUARIO 
                            SET NOMBRES = ?,
                                PATERNO = ?,
                                MATERNO = ?,
                                DIRECCION = ?,
                                NUM_CONTRATO = ?,
                                TELEFONO = ?,
                                COD_DISTRITO = ?,
                                COD_CENTRO_POBLADO = ?,
                                COD_COMUNIDAD_CAMPESINA = ?,
                                COD_COMUNIDAD_NATIVA = ?,
                                ESTADO = ?
                            WHERE DNI = ?`,
                                [usuario.nombres,
                                 usuario.paterno,
                                 usuario.materno,
                                 usuario.direccion,
                                 usuario.numeroContrato,
                                 usuario.telefono,
                                 usuario.codigoDistrito,
                                 usuario.codigoCentroPoblado,
                                 usuario.codigoComunidadCampesina,
                                 usuario.codigoComunidadNativa,
                                 usuario.estado,
                                 usuario.dni]);
      return usuario;
    } catch(error) {
      logger.error(`Error al actualizar usuario:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarUsuarioPorDni(dni) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("UPDATE TBL_USUARIO SET ESTADO = ? WHERE DNI = ?", [UsuarioEstados.ELIMINADO, dni]);
    } catch(error) {
      logger.error(`Error al eliminar usuario por dni:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async resetearContrasenaPorDni({ dni, clave }) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      return await conexion.query(`UPDATE TBL_USUARIO 
                            SET CLAVE = ?
                            WHERE DNI = ?`,
                            [clave, dni]);
    } catch(error) {
      logger.error(`Error al retesear contraseña:${error}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerUsuarioPorId(idUsuario) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_USUARIO WHERE ID_USUARIO = ?", [idUsuario]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new UsuarioModelo({
                                    idUsuario: fila.ID_USUARIO.toString(),
                                    nombres: fila.NOMBRES,
                                    paterno: fila.PATERNO,
                                    materno: fila.MATERNO,
                                    dni: fila.DNI,
                                    direccion: fila.DIRECCION,
                                    numeroContrato: fila.NUM_CONTRATO,
                                    telefono: fila.TELEFONO,
                                    clave: fila.CLAVE,
                                    estado: fila.ESTADO,
                                    codigoDistrito: fila.COD_DISTRITO,
                                    codigoCentroPoblado: fila.COD_CENTRO_POBLADO,
                                    codigoComunidadCampesina: fila.COD_COMUNIDAD_CAMPESINA,
                                    codigoComunidadNativa: fila.COD_COMUNIDAD_NATIVA,
                                    fecCreacion: fila.FEC_CREACION,
                                    fecActualizacion: fila.FEC_ACTUALIZACION
                                  });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener usuario`);
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new UsuarioRepositorio();

