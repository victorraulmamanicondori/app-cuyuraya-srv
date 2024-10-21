import express from 'express';
import tarifaControlador from '../controladores/tarifaControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, tarifaControlador.listarTarifas);

router.get('/:codigoTarifa', verificarToken, tarifaControlador.obtenerTarifaPorCodigo);

router.post('/', verificarToken, tarifaControlador.crearTarifa);

router.put('/', verificarToken, tarifaControlador.actualizarTarifa);

router.delete('/:codigoTarifa', verificarToken, tarifaControlador.eliminarTarifaPorCodigo);

export default router;