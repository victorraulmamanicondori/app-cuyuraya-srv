import express from 'express';
import loginControlador from '../controladores/loginControlador.js';

const router = express.Router();

router.post('/login', loginControlador.login);

router.post('/refreshToken', loginControlador.refreshToken);

export default router;

