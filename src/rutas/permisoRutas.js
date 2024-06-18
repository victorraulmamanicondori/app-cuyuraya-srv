import express from 'express';
import permisoControlador from '../controladores/permisoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, permisoControlador.listarPermisos);

router.get('/rol/:idRol', verificarToken, permisoControlador.listarPermisosPorRol);

router.get('/usuario/:dni', verificarToken, permisoControlador.listarPermisosPorUsuario);

router.get('/:id', verificarToken, permisoControlador.obtenerPermisoPorId);

router.post('/', verificarToken, permisoControlador.crearPermiso);

router.put('/', verificarToken, permisoControlador.actualizarPermiso);

router.delete('/:id', verificarToken, permisoControlador.eliminarPermisoPorId);

export default router;