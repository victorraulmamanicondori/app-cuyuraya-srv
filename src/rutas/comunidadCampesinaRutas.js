import express from 'express';
import comunidadCampesinaControlador from '../controladores/comunidadCampesinaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoDistrito', comunidadCampesinaControlador.listarComunidadesCampesinasPorDistrito);

router.get('/:id', comunidadCampesinaControlador.obtenerComunidadCampesinaPorId);

router.post('/', verificarToken, comunidadCampesinaControlador.crearComunidadCampesina);

router.put('/', verificarToken, comunidadCampesinaControlador.actualizarComunidadCampesina);

router.delete('/:id', verificarToken, comunidadCampesinaControlador.eliminarComunidadCampesinaPorId);

export default router;