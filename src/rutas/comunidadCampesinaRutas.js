import express from 'express';
import comunidadCampesinaControlador from '../controladores/comunidadCampesinaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', comunidadCampesinaControlador.listarComunidadesCampesinasPorDistrito);

router.get('/:codigoComunidadCampesina', comunidadCampesinaControlador.obtenerComunidadCampesinaPorCodigo);

router.post('/', verificarToken, comunidadCampesinaControlador.crearComunidadCampesina);

router.put('/', verificarToken, comunidadCampesinaControlador.actualizarComunidadCampesina);

router.delete('/:codigoComunidadCampesina', verificarToken, comunidadCampesinaControlador.eliminarComunidadCampesinaPorCodigo);

export default router;