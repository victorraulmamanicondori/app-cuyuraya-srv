import express from 'express';
import medidorControlador from '../controladores/medidorControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, medidorControlador.asignarMedidor);
router.get('/usuario/:dni', verificarToken, medidorControlador.obtenerMedidorPorDni);
router.get('/:codigoMedidor', verificarToken, medidorControlador.obtenerMedidorPorCodigo);
router.post('/desasignar', verificarToken, medidorControlador.eliminarAsignacionMedidor);

export default router;

