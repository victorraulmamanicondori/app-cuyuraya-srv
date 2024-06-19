import logger from '../config/logger.js';
import medidorServicio from '../servicios/medidorServicio.js';

class MedidorControlador {

  async asignarMedidor(req, res) {
    try {
      const { codigoMedidor, dni } = req.body;
      const resultado = await medidorServicio.asignarMedidor(codigoMedidor, dni);
      res.status(200).json(resultado);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

  async detectarAnomaliasPorMedidor(req, res) {
    try {
      const idMedidor = req.params.idMedidor;
      const resultado = await medidorServicio.detectarAnomaliasPorMedidor(idMedidor);
      res.status(200).json(resultado);
    } catch(error) {
      logger.error(error);
      res.status(401).json({ mensaje: error.message });
    }
  }

}

export default new MedidorControlador();

