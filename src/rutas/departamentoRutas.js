import express from 'express';
import departamentoControlador from '../controladores/departamentoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, departamentoControlador.listarDepartamentos);

router.get('/:codigo', verificarToken, departamentoControlador.obtenerDepartamentoPorCodigo);

router.post('/', verificarToken, departamentoControlador.crearDepartamento);

router.put('/', verificarToken, departamentoControlador.actualizarDepartamento);

router.delete('/:codigo', verificarToken, departamentoControlador.eliminarDepartamentoPorCodigo);

export default router;