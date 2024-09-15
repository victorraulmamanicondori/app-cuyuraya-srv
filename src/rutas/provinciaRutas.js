import express from 'express';
import provinciaControlador from '../controladores/provinciaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:codigoDepartamento', provinciaControlador.listarProvinciasPorDepartamento);

router.get('/:codigoDepartamento/:codigoProvincia', provinciaControlador.obtenerProvinciaPorCodigo);

router.post('/', verificarToken, provinciaControlador.crearProvincia);

router.put('/', verificarToken, provinciaControlador.actualizarProvincia);

router.delete('/:codigoDepartamento/:codigoProvincia', verificarToken, provinciaControlador.eliminarProvinciaPorCodigo);

export default router;