/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import distritoControlador from '../controladores/distritoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/provincia/:codigoProvincia', distritoControlador.listarDistritosPorProvincia);

router.get('/:codigoDistrito', distritoControlador.obtenerDistritoPorCodigo);

router.post('/', verificarToken, distritoControlador.crearDistrito);

router.put('/', verificarToken, distritoControlador.actualizarDistrito);

router.delete('/:codigoDistrito', verificarToken, distritoControlador.eliminarDistritoPorCodigo);

export default router;