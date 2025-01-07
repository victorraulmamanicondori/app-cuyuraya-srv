import pool from '../config/db.js';
import logger from '../config/logger.js';
import {TarifaEstados} from '../constantes/estados.js';
import TarifaModelo from '../modelos/TarifaModelo.js';
import { toNullIfUndefined } from '../constantes/util.js';

class TarifaRepositorio {

  async listarTarifas() {
    let conexion;
    try {
      conexion = await pool.getConnection();
      const [filas] = await conexion.execute("SELECT * FROM TBL_TARIFA WHERE ESTADO = ? ORDER BY COD_TARIFA ASC", [TarifaEstados.ACTIVO]);
      return filas.map(fila => new TarifaModelo({ idTarifa: fila.ID_TARIFA,
                                                  codigoTarifa: fila.COD_TARIFA, 
                                                  descripcion: fila.DESCRIPCION,
                                                  montoTarifa: fila.MONTO_TARIFA,
                                                  m3Consumo: fila.M3_CONSUMO,
                                                  montoExtraPorM3: fila.MONTO_EXTRA_POR_M3,
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
      const [filas] = await conexion.execute("SELECT * FROM TBL_TARIFA WHERE COD_TARIFA = ? AND ESTADO = ?", [toNullIfUndefined(codigoTarifa), TarifaEstados.ACTIVO]);
      if (filas.length > 0) {
        const fila = filas[0];
        return new TarifaModelo({
                          idTarifa: fila.ID_TARIFA,
                          codigoTarifa: fila.COD_TARIFA,
                          descripcion: fila.DESCRIPCION,
                          montoTarifa: fila.MONTO_TARIFA,
                          m3Consumo: fila.M3_CONSUMO,
                          montoExtraPorM3: fila.MONTO_EXTRA_POR_M3,
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
      const { codigoTarifa, descripcion, montoTarifa, m3Consumo, montoExtraPorM3 } = tarifa;
      conexion = await pool.getConnection();
      await conexion.execute(`INSERT INTO TBL_TARIFA (COD_TARIFA, DESCRIPCION, MONTO_TARIFA, M3_CONSUMO, MONTO_EXTRA_POR_M3, ESTADO) VALUES (?, ?, ?, ?, ?, ?)`, 
        [toNullIfUndefined(codigoTarifa), 
          toNullIfUndefined(descripcion), 
          toNullIfUndefined(montoTarifa), 
          toNullIfUndefined(m3Consumo), 
          toNullIfUndefined(montoExtraPorM3), 
          TarifaEstados.ACTIVO]);
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
      const { codigoTarifa, descripcion, montoTarifa, estado } = tarifa;
      conexion = await pool.getConnection();
      await conexion.execute(`UPDATE TBL_TARIFA
                              SET DESCRIPCION = ?,
                              MONTO_TARIFA = ?,
                              ESTADO = ?
                            WHERE COD_TARIFA = ?`,
                                [toNullIfUndefined(descripcion), 
                                  toNullIfUndefined(montoTarifa), 
                                  toNullIfUndefined(estado), 
                                  toNullIfUndefined(codigoTarifa)]);
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
      await conexion.execute("DELETE FROM TBL_TARIFA WHERE COD_TARIFA = ?", 
        [toNullIfUndefined(codigoTarifa)]);
    } catch(error) {
      console.log(error);
      throw new Error('Error al tratar de eliminar tarifa');
    } finally {
      if (conexion) conexion.release();
    }
  }
}

export default new TarifaRepositorio();

