/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import rolControlador from '../controladores/rolControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, rolControlador.listarRoles);

router.get('/usuario/:dni', verificarToken, rolControlador.listarRolesPorUsuario);

router.get('/:id', verificarToken, rolControlador.obtenerRolPorId);

router.post('/', verificarToken, rolControlador.crearRol);

router.put('/', verificarToken, rolControlador.actualizarRol);

router.delete('/:id', verificarToken, rolControlador.eliminarRolPorId);

export default router;