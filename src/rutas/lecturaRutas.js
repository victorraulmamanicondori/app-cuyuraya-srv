import express from 'express';
import lecturaControlador from '../controladores/lecturaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

// La ruta '/' se asocia al middleware y metodo del controlador
router.post('/', verificarToken, lecturaControlador.registrarLectura);

export default router;

