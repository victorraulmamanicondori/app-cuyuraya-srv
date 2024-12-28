import express from 'express';
import comunidadNativaControlador from '../controladores/comunidadNativaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', comunidadNativaControlador.listarComunidadesNativasPorDistrito);

router.get('/:codigoComunidadNativa', comunidadNativaControlador.obtenerComunidadNativaPorCodigo);

router.post('/', verificarToken, comunidadNativaControlador.crearComunidadNativa);

router.put('/', verificarToken, comunidadNativaControlador.actualizarComunidadNativa);

router.delete('/:codigoComunidadNativa', verificarToken, comunidadNativaControlador.eliminarComunidadNativaPorCodigo);

export default router;
