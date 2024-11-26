import express from 'express';
import medidorControlador from '../controladores/medidorControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, medidorControlador.asignarMedidor);
router.get('/detectar-anomalias/:codigoMedidor', verificarToken, medidorControlador.detectarAnomaliasPorMedidor);
router.get('/usuario/:dni', verificarToken, medidorControlador.obtenerMedidorPorDni);
router.get('/:codigoMedidor', verificarToken, medidorControlador.obtenerMedidorPorCodigo);

export default router;

