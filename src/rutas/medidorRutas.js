import express from 'express';
import medidorControlador from '../controladores/medidorControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, medidorControlador.asignarMedidor);

export default router;

