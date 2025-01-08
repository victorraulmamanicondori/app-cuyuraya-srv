/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import knex from 'knex';

// /seeds/initial_data.js
export const seed = async function (knex) {
    // Limpiar datos existentes
    await knex('TBL_DEPARTAMENTO').del();
    await knex('TBL_PROVINCIA').del();
    await knex('TBL_DISTRITO').del();
    await knex('TBL_CENTRO_POBLADO').del();
    await knex('TBL_COMUNIDAD_CAMPESINA').del();
    await knex('TBL_COMUNIDAD_NATIVA').del();
    await knex('TBL_ROL_PERMISO').del();
    await knex('TBL_PERMISO').del();
    await knex('TBL_ROL').del();
    await knex('TBL_TARIFA').del();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    let sqlPath = path.join(__dirname, 'TBL_DEPARTAMENTO.sql');
    let sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_PROVINCIA.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_DISTRITO.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_CENTRO_POBLADO_1.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_CENTRO_POBLADO_2.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_CENTRO_POBLADO_3.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_CENTRO_POBLADO_4.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_COMUNIDAD_CAMPESINA.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    sqlPath = path.join(__dirname, 'TBL_COMUNIDAD_NATIVA.sql');
    sql = fs.readFileSync(sqlPath, 'utf8');
    await knex.raw(sql);

    // Insertar datos iniciales
    await knex('TBL_ROL').insert([
        { NOMBRE: 'administrador', ESTADO: 'activo' },
        { NOMBRE: 'operador', ESTADO: 'activo' },
        { NOMBRE: 'invitado', ESTADO: 'activo' },
    ]);

    await knex('TBL_PERMISO').insert([
        { NOMBRE: 'GESTIONAR_USUARIOS', DESCRIPCION: 'Permite gestionar usuarios' },
        { NOMBRE: 'VER_REPORTES', DESCRIPCION: 'Permite ver reportes' },
        { NOMBRE: 'REGISTRAR_LECTURA', DESCRIPCION: 'Permite registrar lecturas de medidores' },
        { NOMBRE: 'PAGAR_RECIBOS', DESCRIPCION: 'Permite pagar recibos' },
    ]);

    await knex('TBL_ROL_PERMISO').insert([
        { ID_ROL: 1, ID_PERMISO: 1 },
        { ID_ROL: 1, ID_PERMISO: 2 },
        { ID_ROL: 1, ID_PERMISO: 3 },
        { ID_ROL: 1, ID_PERMISO: 4 },
        { ID_ROL: 2, ID_PERMISO: 2 },
        { ID_ROL: 2, ID_PERMISO: 3 },
        { ID_ROL: 3, ID_PERMISO: 4 },
    ]);

    await knex('TBL_TARIFA').insert([
        {
            COD_TARIFA: 'BASE',
            DESCRIPCION: 'Tarifa base',
            MONTO_TARIFA: 5.0,
            M3_CONSUMO: 5.0,
            MONTO_EXTRA_POR_M3: 1.0,
            ESTADO: 'ACTIVO',
        },
    ]);

    await knex('TBL_RUBRO').insert([
        {
            TIPO_RUBRO: 'Ingreso',
            ESTADO: 'ACTIVO',
        },
        {
            TIPO_RUBRO: 'Egreso',
            ESTADO: 'ACTIVO',
        },
    ]);

    await knex('TBL_TIPO_MOVIMIENTO').insert([
        {
            CONCEPTO: 'Pago de Recibo',
            ID_RUBRO: 1,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Pago de Mora',
            ID_RUBRO: 1,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Otros Ingreso',
            ID_RUBRO: 1,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Instalaciones Nuevas',
            ID_RUBRO: 1,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Operador del Sistema',
            ID_RUBRO: 2,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Herramientas',
            ID_RUBRO: 2,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Viaticos y Pasajes',
            ID_RUBRO: 2,
            ESTADO: 'ACTIVO'
        },
        {
            CONCEPTO: 'Combustibles y lubricantes',
            ID_RUBRO: 2,
            ESTADO: 'ACTIVO'
        },
    ]);

    await knex('TBL_USUARIO').insert([
        {
            NOMBRES: 'Administrador',
            PATERNO: 'Administrador',
            MATERNO: 'Administrador',
            DNI: '12345678',
            DIRECCION: 'EAS',
            CLAVE: '$2b$10$PCF/a.1EzD8jksdxfiPFnORV3I8.KlrhRAqHHkNN11FBblR65hZf.',
            ESTADO: 'ACTIVO',
        },
    ]);
};
