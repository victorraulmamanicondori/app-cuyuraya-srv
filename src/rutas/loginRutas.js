import express from 'express';
import loginControlador from '../controladores/loginControlador.js';

const router = express.Router();

router.post('/', loginControlador.login);

router.post('/refreshToken', loginControlador.refreshToken);

export default router;

