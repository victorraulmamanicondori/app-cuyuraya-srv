import express from 'express';
import departamentoControlador from '../controladores/departamentoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', departamentoControlador.listarDepartamentos);

router.get('/:codigo', departamentoControlador.obtenerDepartamentoPorCodigo);

router.post('/', verificarToken, departamentoControlador.crearDepartamento);

router.put('/', verificarToken, departamentoControlador.actualizarDepartamento);

router.delete('/:codigo', verificarToken, departamentoControlador.eliminarDepartamentoPorCodigo);

export default router;