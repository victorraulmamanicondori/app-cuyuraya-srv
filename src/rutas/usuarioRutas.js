/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import usuarioControlador from '../controladores/usuarioControlador.js';
import {verificarToken} from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, usuarioControlador.listarUsuarios);

router.post('/:dni/rol/:idRol', verificarToken, usuarioControlador.asignarRolAlUsuario);

router.get('/:dni', verificarToken, usuarioControlador.obtenerUsuarioPorDni);

router.post('/', usuarioControlador.crearUsuario);

router.put('/', verificarToken, usuarioControlador.actualizarUsuario);

router.delete('/:dni', verificarToken, usuarioControlador.eliminarUsuarioPorDni);

router.put('/resetear-contrasena', usuarioControlador.resetearContrasenaPorDni);

router.get('/ubigeo/:codigoDistrito', verificarToken, usuarioControlador.listarUsuariosPorUbigeo);

router.get('/id/:idUsuario', verificarToken, usuarioControlador.obtenerUsuarioPorId);

router.get('/padron/:codigoDistrito', usuarioControlador.imprimirPadronUsuarios);

router.post('/carga-masiva', verificarToken, usuarioControlador.cargaMasivoUsuarios);

export default router;

