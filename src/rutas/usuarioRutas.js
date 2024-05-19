const express = require('express');
const router = express.Router();

const usuarioControlador = require('../controladores/usuarioControlador');
const { verificarToken } = require('../middlewares/autenticacionMiddleware');

router.get('/', verificarToken, usuarioControlador.listarUsuarios);

router.get('/:dni', verificarToken, usuarioControlador.obtenerUsuarioPorDni);

router.post('/', usuarioControlador.crearUsuario);

router.put('/', verificarToken, usuarioControlador.actualizarUsuario);

router.delete('/:dni', verificarToken, usuarioControlador.eliminarUsuarioPorDni);

module.exports = router;

