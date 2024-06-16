import express from 'express';
import provinciaControlador from '../controladores/provinciaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoDepartamento', verificarToken, provinciaControlador.listarProvinciasPorDepartamento);

router.get('/:codigo', verificarToken, provinciaControlador.obtenerProvinciaPorCodigo);

router.post('/', verificarToken, provinciaControlador.crearProvincia);

router.put('/', verificarToken, provinciaControlador.actualizarProvincia);

router.delete('/:codigo', verificarToken, provinciaControlador.eliminarProvinciaPorCodigo);

export default router;