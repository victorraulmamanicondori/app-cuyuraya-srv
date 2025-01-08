/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import departamentoControlador from '../controladores/departamentoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', departamentoControlador.listarDepartamentos);

router.get('/:codigoDepartamento', departamentoControlador.obtenerDepartamentoPorCodigo);

router.post('/', verificarToken, departamentoControlador.crearDepartamento);

router.put('/', verificarToken, departamentoControlador.actualizarDepartamento);

router.delete('/:codigoDepartamento', verificarToken, departamentoControlador.eliminarDepartamentoPorCodigo);

export default router;