/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import centroPobladoControlador from '../controladores/centroPobladoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', centroPobladoControlador.listarCentrosPobladosPorDistrito);

router.get('/:codigoCentroPoblado', centroPobladoControlador.obtenerCentroPobladoPorCodigo);

router.post('/', verificarToken, centroPobladoControlador.crearCentroPoblado);

router.put('/', verificarToken, centroPobladoControlador.actualizarCentroPoblado);

router.delete('/:codigoCentroPoblado', verificarToken, centroPobladoControlador.eliminarCentroPobladoPorCodigo);

export default router;