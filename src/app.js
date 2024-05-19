require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const usuarioRutas = require('./rutas/usuarioRutas');
const loginRutas = require('./rutas/loginRutas');

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

app.use('/api/usuarios', usuarioRutas);
app.use('/api/auth', loginRutas);

app.listen(puerto, () => {
	console.log(`Ejecutando aplicacion backend de APIs en el puerto http://localhost:${puerto}`);
});

