/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import ComunidadNativaModelo from '../modelos/ComunidadNativaModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class ComunidadNativaRepositorio {

  async listarComunidadesNativasPorDistrito(codigoDistrito) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO LIKE ? ORDER BY NOMBRE ASC", 
        [`${toNullIfUndefined(codigoDistrito)}%`]);
      return filas.map(fila => new ComunidadNativaModelo({ codigo: fila.CODIGO, 
                                                            nombre: fila.NOMBRE,
                                                            familiaLinguistica: fila.FAM_LINGUISTICA,
                                                            etnia: fila.ETNIA }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar comunidadNativas');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerComunidadNativaPorCodigo(codigoComunidadNativa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO = ?", [toNullIfUndefined(codigoComunidadNativa)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new ComunidadNativaModelo({ codigo: fila.CODIGO, 
                                         nombre: fila.NOMBRE,
                                         familiaLinguistica: fila.FAM_LINGUISTICA,
                                         etnia: fila.ETNIA });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener comunidadNativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearComunidadNativa(comunidadNativa) {
    let conexion;
    try {
      const { codigo, nombre, familiaLinguistica, etnia } = comunidadNativa;
      conexion = await pool.getConnection();
      const [resultado] = await conexion.execute(`INSERT INTO TBL_COMUNIDAD_NATIVA (CODIGO, NOMBRE, FAM_LINGUISTICA, ETNIA) VALUES (?, ?, ?, ?)`, 
        [toNullIfUndefined(codigo), toNullIfUndefined(nombre), toNullIfUndefined(familiaLinguistica), toNullIfUndefined(etnia)]);
      return comunidadNativa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar comunidadNativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarComunidadNativa(comunidadNativa) {
    let conexion;
    try {
      const { codigo, nombre, familiaLinguistica, etnia } = comunidadNativa;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_COMUNIDAD_NATIVA
                            SET NOMBRE = ?, FAM_LINGUISTICA = ?, ETNIA = ?
                            WHERE CODIGO = ?`,
                                [toNullIfUndefined(nombre), toNullIfUndefined(familiaLinguistica), toNullIfUndefined(etnia), toNullIfUndefined(codigo)]);
      return comunidadNativa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar Comunidad Nativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarComunidadNativaPorCodigo(codigoComunidadNativa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_COMUNIDAD_NATIVA WHERE CODIGO = ?", [toNullIfUndefined(codigoComunidadNativa)]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar Comunidad Nativa');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new ComunidadNativaRepositorio();
