import express from 'express';
import centroPobladoControlador from '../controladores/centroPobladoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', centroPobladoControlador.listarCentrosPobladosPorDistrito);

router.get('/:codigoCentroPoblado', centroPobladoControlador.obtenerCentroPobladoPorCodigo);

router.post('/', verificarToken, centroPobladoControlador.crearCentroPoblado);

router.put('/', verificarToken, centroPobladoControlador.actualizarCentroPoblado);

router.delete('/:codigoCentroPoblado', verificarToken, centroPobladoControlador.eliminarCentroPobladoPorCodigo);

export default router;