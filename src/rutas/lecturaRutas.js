import express from 'express';
import lecturaControlador from '../controladores/lecturaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:idMedidor', verificarToken, lecturaControlador.obtenerLecturasPorMedidor);
router.post('/', verificarToken, lecturaControlador.registrarLectura);

export default router;

