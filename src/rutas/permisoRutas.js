import express from 'express';
import permisoContpermisoador from '../controladores/permisoControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, permisoContpermisoador.listarPermisos);

router.get('/:id', verificarToken, permisoContpermisoador.obtenerPermisoPorId);

router.post('/', verificarToken, permisoContpermisoador.crearPermiso);

router.put('/', verificarToken, permisoContpermisoador.actualizarPermiso);

router.delete('/:id', verificarToken, permisoContpermisoador.eliminarPermisoPorId);

export default router;