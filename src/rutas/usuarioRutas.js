import express from 'express';
import usuarioControlador from '../controladores/usuarioControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, usuarioControlador.listarUsuarios);

router.post('/:dni/rol/:idRol', verificarToken, usuarioControlador.asignarRolAlUsuario);

router.get('/:dni', verificarToken, usuarioControlador.obtenerUsuarioPorDni);

router.post('/', usuarioControlador.crearUsuario);

router.put('/', verificarToken, usuarioControlador.actualizarUsuario);

router.delete('/:dni', verificarToken, usuarioControlador.eliminarUsuarioPorDni);

export default router;

