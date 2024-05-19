import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import usuarioRutas from './rutas/usuarioRutas.js';
import loginRutas from './rutas/loginRutas.js';

dotenv.config();

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

export default app;

