import express from 'express';
import centroPobladoControlador from '../controladores/centroPobladoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoDistrito', verificarToken, centroPobladoControlador.listarCentrosPobladosPorDistrito);

router.get('/:id', verificarToken, centroPobladoControlador.obtenerCentroPobladoPorId);

router.post('/', verificarToken, centroPobladoControlador.crearCentroPoblado);

router.put('/', verificarToken, centroPobladoControlador.actualizarCentroPoblado);

router.delete('/:id', verificarToken, centroPobladoControlador.eliminarCentroPobladoPorId);

export default router;