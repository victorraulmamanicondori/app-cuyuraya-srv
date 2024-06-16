import express from 'express';
import distritoControlador from '../controladores/distritoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoProvincia', verificarToken, distritoControlador.listarDistritosPorProvincia);

router.get('/:codigo', verificarToken, distritoControlador.obtenerDistritoPorCodigo);

router.post('/', verificarToken, distritoControlador.crearDistrito);

router.put('/', verificarToken, distritoControlador.actualizarDistrito);

router.delete('/:codigo', verificarToken, distritoControlador.eliminarDistritoPorCodigo);

export default router;