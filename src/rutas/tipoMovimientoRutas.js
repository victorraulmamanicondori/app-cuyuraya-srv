/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';
import tipoMovimientoControlador from '../controladores/tipoMovimientoControlador.js';

const router = express.Router();

router.get('/rubro/:tipoRubro', verificarToken, tipoMovimientoControlador.listarPorTipoRubro);

export default router;

