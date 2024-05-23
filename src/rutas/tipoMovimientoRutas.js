import express from 'express';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';
import tipoMovimientoControlador from '../controladores/tipoMovimientoControlador.js';

const router = express.Router();

router.get('/rubro/:tipoRubro', verificarToken, tipoMovimientoControlador.listarPorTipoRubro);

export default router;

