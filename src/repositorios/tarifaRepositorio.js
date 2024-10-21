import pool from '../config/db.js';
import logger from '../config/logger.js';
import {TarifaEstados} from '../constantes/estados.js';
import TarifaModelo from '../modelos/TarifaModelo.js';

class TarifaRepositorio {

  async listarTarifas() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_TARIFA ORDER BY COD_TARIFA ASC");
      return filas.map(fila => new TarifaModelo({ idTarifa: fila.ID_TARIFA.toString(),
                                                  codigoTarifa: fila.COD_TARIFA, 
                                                  descripcion: fila.DESCRIPCION,
                                                  montoTarifa: fila.MONTO_TARIFA,
                                                  estado: fila.ESTADO,
                                                  fecCreacion: fila.FEC_CREACION,
                                                  fecActualizacion: fila.FEC_ACTUALIZACION
                                                }));
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de listar tarifas');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async obtenerTarifaPorCodigo(codigoTarifa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const filas = await conexion.query("SELECT * FROM TBL_TARIFA WHERE COD_TARIFA = ?", [codigoTarifa]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new TarifaModelo({
                          idTarifa: fila.ID_TARIFA.toString(),
                          codigoTarifa: fila.COD_TARIFA,
                          descripcion: fila.DESCRIPCION,
                          montoTarifa: fila.MONTO_TARIFA,
                          estado: fila.ESTADO,
                          fecCreacion: fila.FEC_CREACION,
                          fecActualizacion: fila.FEC_ACTUALIZACION
                        });
      }
      return null;
    } catch(error) {
      logger.error(`Error al obtener tarifa por codigo:${codigoTarifa}`);
    } finally {
      if (conexion) conexion.release();
    }
  }

  async crearTarifa(tarifa) {
    let conexion;
    try {
      const { codigoTarifa, descripcion, montoTarifa } = tarifa;
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_TARIFA (COD_TARIFA, DESCRIPCION, MONTO_TARIFA, ESTADO) VALUES (?, ?, ?, ?)`, [codigoTarifa, descripcion, montoTarifa, TarifaEstados.ACTIVO]);
      return tarifa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de registrar tarifa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async actualizarTarifa(tarifa) {
    let conexion;
    try {
      const { codigoTarifa, descripcion, montoTarifa } = tarifa;
      conexion = await pool.getConnection();
      await conexion.query(`UPDATE TBL_TARIFA
                            SET DESCRIPCION = ?,
                            MONTO_TARIFA = ?
                            WHERE COD_TARIFA = ?`,
                                [descripcion, montoTarifa, codigoTarifa]);
      return tarifa;
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de actualizar tarifa');
    } finally {
      if (conexion) conexion.release();
    }
  }

  async eliminarTarifaPorCodigo(codigoTarifa) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query("DELETE FROM TBL_TARIFA WHERE COD_TARIFA = ?", [codigoTarifa]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar tarifa');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new TarifaRepositorio();

