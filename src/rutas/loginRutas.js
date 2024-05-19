const express = require('express');
const router = express.Router();

const loginControlador = require('../controladores/loginControlador');

router.post('/login', loginControlador.login);

router.post('/refreshToken', loginControlador.refreshToken);

module.exports = router;

