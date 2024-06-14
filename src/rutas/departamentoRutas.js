import express from 'express';
import departamentoControlador from '../controladores/departamentoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, departamentoControlador.listarDepartamentos);

router.get('/:id', verificarToken, departamentoControlador.obtenerDepartamentoPorId);

router.post('/', verificarToken, departamentoControlador.crearDepartamento);

router.put('/', verificarToken, departamentoControlador.actualizarDepartamento);

router.delete('/:id', verificarToken, departamentoControlador.eliminarDepartamentoPorId);

export default router;