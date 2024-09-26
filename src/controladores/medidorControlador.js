import logger from '../config/logger.js';
import medidorServicio from '../servicios/medidorServicio.js';

class MedidorControlador {

  async asignarMedidor(req, res) {
    try {
      const { codigoMedidor, dni } = req.body;
      const resultado = await medidorServicio.asignarMedidor(codigoMedidor, dni);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Medidor asignado exitosamente',
        datos: resultado
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }
  
  async detectarAnomaliasPorMedidor(req, res) {
    try {
      const codigoMedidor = req.params.codigoMedidor;
      const resultado = await medidorServicio.detectarAnomaliasPorMedidor(codigoMedidor);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Resultado de anomalias de consumos',
        datos: resultado
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }  

}

export default new MedidorControlador();

