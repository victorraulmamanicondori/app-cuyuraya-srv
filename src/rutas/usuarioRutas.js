import express from 'express';
import usuarioControlador from '../controladores/usuarioControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', usuarioControlador.listarUsuarios);

router.post('/:dni/rol/:idRol', usuarioControlador.asignarRolAlUsuario);

router.get('/:dni', usuarioControlador.obtenerUsuarioPorDni);

router.post('/', usuarioControlador.crearUsuario);

router.put('/', usuarioControlador.actualizarUsuario);

router.delete('/:dni', usuarioControlador.eliminarUsuarioPorDni);

export default router;

