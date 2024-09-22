import express from 'express';
import comunidadCampesinaControlador from '../controladores/comunidadCampesinaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', comunidadCampesinaControlador.listarComunidadesCampesinasPorDistrito);

router.get('/:codigoDistrito', comunidadCampesinaControlador.obtenerComunidadCampesinaPorCodigo);

router.post('/', verificarToken, comunidadCampesinaControlador.crearComunidadCampesina);

router.put('/', verificarToken, comunidadCampesinaControlador.actualizarComunidadCampesina);

router.delete('/:codigoDistrito', verificarToken, comunidadCampesinaControlador.eliminarComunidadCampesinaPorCodigo);

export default router;