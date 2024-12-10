import express from 'express';
import cajaControlador from '../controladores/cajaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, cajaControlador.registrarCaja);
router.get('/reporte/:tipoRubro', cajaControlador.generarReportePorRubro);

export default router;

