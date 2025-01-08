/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import pool from '../config/db.js';
import DepartamentoModelo from '../modelos/DepartamentoModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class DepartamentoRepositorio {

  async listarDepartamentos() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_DEPARTAMENTO ORDER BY NOMBRE ASC");
      return filas.map(fila => new DepartamentoModelo({ codigo: fila.CODIGO, 
                                                  nombre: fila.NOMBRE }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar departamentos');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerDepartamentoPorCodigo(codigo) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_DEPARTAMENTO WHERE CODIGO = ?", [toNullIfUndefined(codigo)]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new DepartamentoModelo({ codigo: fila.CODIGO, 
                                  nombre: fila.NOMBRE });
      }
      return null;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de obtener departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearDepartamento(departamento) {
    let conexion;
    try {
      const { codigo, nombre } = departamento;
      conexion = await pool.getConnection();
      await conexion.execute(`INSERT INTO TBL_DEPARTAMENTO (CODIGO, NOMBRE) VALUES (?, ?)`, [toNullIfUndefined(codigo), toNullIfUndefined(nombre)]);
      return departamento;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarDepartamento(departamento) {
    let conexion;
    try {
      const { codigo, nombre } = departamento;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_DEPARTAMENTO
                            SET NOMBRE = ?
                            WHERE CODIGO = ?`,
                                [toNullIfUndefined(nombre), toNullIfUndefined(codigo)]);
      return departamento;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarDepartamentoPorCodigo(codigo) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.execute("DELETE FROM TBL_DEPARTAMENTO WHERE CODIGO = ?", [toNullIfUndefined(codigo)]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar departamento');
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new DepartamentoRepositorio();
