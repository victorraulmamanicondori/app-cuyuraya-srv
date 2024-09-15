import express from 'express';
import distritoControlador from '../controladores/distritoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoDepartamento/:codigoProvincia', distritoControlador.listarDistritosPorProvincia);

router.get('/:codigoDepartamento/:codigoProvincia/:codigoDistrito', distritoControlador.obtenerDistritoPorCodigo);

router.post('/', verificarToken, distritoControlador.crearDistrito);

router.put('/', verificarToken, distritoControlador.actualizarDistrito);

router.delete('/:codigoDepartamento/:codigoProvincia/:codigoDistrito', verificarToken, distritoControlador.eliminarDistritoPorCodigo);

export default router;