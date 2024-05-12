require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const servicioUsuario = require('./servicioUsuario');
const middleware = require('./middleware');
const app = express();
const puerto = process.env.PUERTO || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor!');
});

function paginaInicio(request, response) {
	response.send('<h1>Diseño de software para la administración de sistema de agua potable rural</h1>');
}

app.get('/', paginaInicio); 
app.get('/usuarios', middleware.verificarToken, servicioUsuario.listarUsuarios);
app.get('/usuarios/:id', middleware.verificarToken, servicioUsuario.obtenerUsuarioPorId);
app.post('/usuarios', servicioUsuario.crearUsuario);
app.put('/usuarios/:id', middleware.verificarToken, servicioUsuario.actualizarUsuario);
app.delete('/usuarios/:id', middleware.verificarToken, servicioUsuario.eliminarUsuario);
app.post('/login', servicioUsuario.login);
app.post('/refreshToken', servicioUsuario.refreshToken);

app.listen(puerto, () => {
	console.log('Ejecutando aplicacion en el puerto http://localhost:' + puerto);
});
