/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import loginControlador from '../controladores/loginControlador.js';

const router = express.Router();

router.post('/', loginControlador.login);

router.post('/refreshToken', loginControlador.refreshToken);

export default router;

