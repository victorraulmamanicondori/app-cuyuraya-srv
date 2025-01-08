/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import tarifaControlador from '../controladores/tarifaControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, tarifaControlador.listarTarifas);

router.get('/:codigoTarifa', verificarToken, tarifaControlador.obtenerTarifaPorCodigo);

router.post('/', verificarToken, tarifaControlador.crearTarifa);

router.put('/', verificarToken, tarifaControlador.actualizarTarifa);

router.delete('/:codigoTarifa', verificarToken, tarifaControlador.eliminarTarifaPorCodigo);

export default router;