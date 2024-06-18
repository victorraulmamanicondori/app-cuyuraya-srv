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