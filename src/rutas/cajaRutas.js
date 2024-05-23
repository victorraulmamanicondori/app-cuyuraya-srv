import express from 'express';
import cajaControlador from '../controladores/cajaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', cajaControlador.registrarCaja);

export default router;

