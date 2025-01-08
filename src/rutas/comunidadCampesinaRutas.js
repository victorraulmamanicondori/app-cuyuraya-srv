/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import comunidadCampesinaControlador from '../controladores/comunidadCampesinaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/distrito/:codigoDistrito', comunidadCampesinaControlador.listarComunidadesCampesinasPorDistrito);

router.get('/:codigoComunidadCampesina', comunidadCampesinaControlador.obtenerComunidadCampesinaPorCodigo);

router.post('/', verificarToken, comunidadCampesinaControlador.crearComunidadCampesina);

router.put('/', verificarToken, comunidadCampesinaControlador.actualizarComunidadCampesina);

router.delete('/:codigoComunidadCampesina', verificarToken, comunidadCampesinaControlador.eliminarComunidadCampesinaPorCodigo);

export default router;