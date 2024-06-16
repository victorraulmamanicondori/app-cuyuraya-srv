import express from 'express';
import sectorControlador from '../controladores/sectorControlador.js';
import { verificarToken } from '../middlewares/autenticacionMiddleware.js';

const router = express.Router();

router.get('/:idComunidadCampesina', verificarToken, sectorControlador.listarSectoresPorComunidadCampesina);

router.get('/:id', verificarToken, sectorControlador.obtenerSectorPorId);

router.post('/', verificarToken, sectorControlador.crearSector);

router.put('/', verificarToken, sectorControlador.actualizarSector);

router.delete('/:id', verificarToken, sectorControlador.eliminarSectorPorId);

export default router;