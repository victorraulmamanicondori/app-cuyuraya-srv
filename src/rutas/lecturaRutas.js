/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import express from 'express';
import lecturaControlador from '../controladores/lecturaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/medidor/:codigoMedidor', verificarToken, lecturaControlador.obtenerLecturasPorMedidor);
router.post('/', verificarToken, lecturaControlador.registrarLectura);
router.put('/', verificarToken, lecturaControlador.actualizarLectura);
router.get('/recibo/:idLectura', lecturaControlador.imprimirRecibo);
router.post('/borrador', verificarToken, lecturaControlador.borradorLectura);
router.get('/pagar/:idLectura', verificarToken, lecturaControlador.registrarPagoRecibo);

export default router;

