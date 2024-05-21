import express from 'express';
import medidorControlador from '../controladores/medidorControlador.js';

const router = express.Router();

router.post('/', medidorControlador.asignarMedidor);

export default router;

