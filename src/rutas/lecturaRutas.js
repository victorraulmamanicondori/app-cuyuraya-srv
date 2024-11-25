import express from 'express';
import lecturaControlador from '../controladores/lecturaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/medidor/:idMedidor', verificarToken, lecturaControlador.obtenerLecturasPorMedidor);
router.post('/', verificarToken, lecturaControlador.registrarLectura);
router.put('/', verificarToken, lecturaControlador.actualizarLectura);

export default router;

