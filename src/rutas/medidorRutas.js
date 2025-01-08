/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import medidorControlador from '../controladores/medidorControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, medidorControlador.asignarMedidor);
router.get('/usuario/:dni', verificarToken, medidorControlador.obtenerMedidorPorDni);
router.get('/:codigoMedidor', verificarToken, medidorControlador.obtenerMedidorPorCodigo);
router.post('/desasignar', verificarToken, medidorControlador.eliminarAsignacionMedidor);

export default router;

