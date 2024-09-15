import logger from '../config/logger.js';
import departamentoServicio from '../servicios/departamentoServicio.js';

class DepartamentoControlador {

  async listarDepartamentos(req, res) {
    try {
      const departamentos = await departamentoServicio.listarDepartamentos();
      res.status(200).json(departamentos);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerDepartamentoPorCodigo(req, res) {
    try {
      const codigoDepartamento = req.params.codigoDepartamento;
      const departamento = await departamentoServicio.obtenerDepartamentoPorCodigo(codigoDepartamento);
      if (departamento) {
        res.status(200).json(departamento);
      } else {
        res.status(404).json({ mensaje: 'Departamento no encontrado' });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    } 
  }

  async crearDepartamento(req, res) {
    try {
      const nuevoDepartamento = await departamentoServicio.crearDepartamento(req.body);
      res.status(201).json(nuevoDepartamento);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarDepartamento(req, res) {
    try {
      const departamentoActualizado = await departamentoServicio.actualizarDepartamento(req.body);
      res.status(200).json(departamentoActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarDepartamentoPorCodigo(req, res) {
    try {
      const codigoDepartamento = req.params.codigoDepartamento;
      await departamentoServicio.eliminarDepartamentoPorCodigo(codigoDepartamento);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }
}

export default new DepartamentoControlador();

