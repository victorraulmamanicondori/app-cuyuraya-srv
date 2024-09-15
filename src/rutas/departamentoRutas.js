import express from 'express';
import departamentoControlador from '../controladores/departamentoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', departamentoControlador.listarDepartamentos);

router.get('/:codigoDepartamento', departamentoControlador.obtenerDepartamentoPorCodigo);

router.post('/', verificarToken, departamentoControlador.crearDepartamento);

router.put('/', verificarToken, departamentoControlador.actualizarDepartamento);

router.delete('/:codigoDepartamento', verificarToken, departamentoControlador.eliminarDepartamentoPorCodigo);

export default router;