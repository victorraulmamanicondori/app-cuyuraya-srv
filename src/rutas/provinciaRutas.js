import express from 'express';
import provinciaControlador from '../controladores/provinciaControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/departamento/:codigoDepartamento', provinciaControlador.listarProvinciasPorDepartamento);

router.get('/:codigoProvincia', provinciaControlador.obtenerProvinciaPorCodigo);

router.post('/', verificarToken, provinciaControlador.crearProvincia);

router.put('/', verificarToken, provinciaControlador.actualizarProvincia);

router.delete('/:codigoProvincia', verificarToken, provinciaControlador.eliminarProvinciaPorCodigo);

export default router;