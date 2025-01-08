/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.js';

const chai = use(chaiHttp);

describe('Usuarios API', () => {
  let token;

  before((done) => {
    // Obtener el token antes de ejecutar las pruebas
    chai.request(app)
      .post('/api/auth/login')
      .send({ dni: '46390550', clave: 'prueba' }) // Cambia esto a un usuario y contraseña válidos
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('accessToken');
        token = res.body.accessToken;
        done();
      });
  });

  it('debería listar todos los usuarios', (done) => {
    chai.request(app)
      .get('/api/usuarios')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('debería obtener un usuario por DNI', (done) => {
    const dni = '46390550'; // Cambia esto a un ID de usuario válido en tu base de datos
    chai.request(app)
      .get(`/api/usuarios/${dni}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('dni').eql(dni);
        done();
      });
  });

  it('debería crear un nuevo usuario', (done) => {
    const nuevoUsuario = {
      nombres: 'Juan',
      paterno: 'Perez',
      materno: 'Gomez',
      dni: '12345678',
      direccion: 'Av. Siempre Viva 123',
      numContrato: '123456',
      telefono: '987654321',
      clave: 'password',
      idRol: 1,
      estado: 'ACTIVO'
    };
    chai.request(app)
      .post('/api/usuarios')
      .send(nuevoUsuario)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('nombres').eql('Juan');
        done();
      });
  });

  it('debería actualizar un usuario', (done) => {
    const usuarioActualizado = {
      nombres: 'Juan Actualizado',
      paterno: 'Perez',
      materno: 'Gomez',
      dni: '12345678',
      direccion: 'Av. Siempre Viva 123',
      numContrato: '123456',
      telefono: '987654321',
      idRol: 1,
      estado: 'ACTIVO'
    };
    chai.request(app)
      .put(`/api/usuarios`)
      .set('Authorization', token)
      .send(usuarioActualizado)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('nombres').eql('Juan Actualizado');
        done();
      });
  });

  it('debería eliminar un usuario', (done) => {
    const dni = '12345678'; // Cambia esto a un dni de usuario válido en tu base de datos
    chai.request(app)
      .delete(`/api/usuarios/${dni}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

