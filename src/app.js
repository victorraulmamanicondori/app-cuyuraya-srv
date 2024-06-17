import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './config/logger.js';
import usuarioRutas from './rutas/usuarioRutas.js';
import loginRutas from './rutas/loginRutas.js';
import medidorRutas from './rutas/medidorRutas.js';
import tipoMovimientoRutas from './rutas/tipoMovimientoRutas.js';
import cajaRutas from './rutas/cajaRutas.js';
import lecturaRutas from './rutas/lecturaRutas.js';
import departamentoRutas from './rutas/departamentoRutas.js';
import provinciaRutas from './rutas/provinciaRutas.js';
import distritoRutas from './rutas/distritoRutas.js';
import centroPobladoRutas from './rutas/centroPobladoRutas.js';
import comunidadCampesinaRutas from './rutas/comunidadCampesinaRutas.js';
import sectorRutas from './rutas/sectorRutas.js';
import rolRutas from './rutas/rolRutas.js';
import permisoRutas from './rutas/permisoRutas.js';

dotenv.config();

const app = express();
const puerto = process.env.PUERTO || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Error interno del servidor!');
});

function paginaInicio(request, response) {
	response.send('<h1>Diseño de software para la administración de sistema de agua potable rural</h1>');
}

app.get('/', paginaInicio); 

app.use('/api/usuarios', usuarioRutas);
app.use('/api/login', loginRutas);
app.use('/api/medidores', medidorRutas);
app.use('/api/tipos-movimientos', tipoMovimientoRutas);
app.use('/api/cajas', cajaRutas);
app.use('/api/lecturas', lecturaRutas);
app.use('/api/departamentos', departamentoRutas);
app.use('/api/provincias', provinciaRutas);
app.use('/api/distritos', distritoRutas);
app.use('/api/centros-poblados', centroPobladoRutas);
app.use('/api/comunidades-campesinas', comunidadCampesinaRutas);
app.use('/api/sectores', sectorRutas);
app.use('/api/roles', rolRutas);
app.use('/api/permisos', permisoRutas);

app.listen(puerto, () => {
	logger.info(`Ejecutando aplicacion backend de APIs en el puerto http://localhost:${puerto}`);
});

export default app;

