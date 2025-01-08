/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

export const up = async function(knex) {
    await knex.schema
      // Crear tabla de Departamentos
      .createTable('TBL_DEPARTAMENTO', table => {
        table.string('CODIGO', 2).primary();
        table.string('NOMBRE', 255).notNullable();
      })
      // Crear tabla de Provincias
      .createTable('TBL_PROVINCIA', table => {
        table.string('CODIGO', 4).primary();
        table.string('NOMBRE', 255).notNullable();
      })
      // Crear tabla de Distritos
      .createTable('TBL_DISTRITO', table => {
        table.string('CODIGO', 6).primary();
        table.string('NOMBRE', 255).notNullable();
      })
      // Crear tabla de Centros Poblados
      .createTable('TBL_CENTRO_POBLADO', table => {
        table.string('CODIGO', 10).primary();
        table.string('NOMBRE', 100).notNullable();
        table.string('AREA', 100);
      })
      // Crear tabla de Comunidades Campesinas
      .createTable('TBL_COMUNIDAD_CAMPESINA', table => {
        table.string('CODIGO', 10).primary();
        table.string('NOMBRE', 100).notNullable();
      })
      // Crear tabla de Comunidades Nativas
      .createTable('TBL_COMUNIDAD_NATIVA', table => {
        table.string('CODIGO', 10).primary();
        table.string('NOMBRE', 100).notNullable();
        table.string('FAM_LINGUISTICA', 100);
        table.string('ETNIA', 100);
      })
      // Crear tabla de Roles
      .createTable('TBL_ROL', table => {
        table.increments('ID_ROL').unsigned().primary();
        table.string('NOMBRE', 20).unique().notNullable();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
      })
      // Crear tabla de Permisos
      .createTable('TBL_PERMISO', table => {
        table.increments('ID_PERMISO').unsigned().primary();
        table.string('NOMBRE', 100).unique().notNullable();
        table.string('DESCRIPCION', 255).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
      })
      // Crear tabla de Relaciones entre Roles y Permisos
      .createTable('TBL_ROL_PERMISO', table => {
        table.integer('ID_ROL').unsigned().notNullable();
        table.integer('ID_PERMISO').unsigned().notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.primary(['ID_ROL', 'ID_PERMISO']);
        table.foreign('ID_ROL').references('ID_ROL').inTable('TBL_ROL');
        table.foreign('ID_PERMISO').references('ID_PERMISO').inTable('TBL_PERMISO');
      })
      // Crear tabla de Usuarios
      .createTable('TBL_USUARIO', table => {
        table.increments('ID_USUARIO').primary();
        table.string('NOMBRES', 255).notNullable();
        table.string('PATERNO', 255).notNullable();
        table.string('MATERNO', 255).notNullable();
        table.string('DNI', 8).unique().notNullable();
        table.string('DIRECCION', 255).notNullable();
        table.string('NUM_CONTRATO', 255);
        table.string('TELEFONO', 20);
        table.string('CLAVE', 255).notNullable();
        table.string('COD_DISTRITO', 6);
        table.string('COD_CENTRO_POBLADO', 10);
        table.string('COD_COMUNIDAD_CAMPESINA', 10);
        table.string('COD_COMUNIDAD_NATIVA', 10);
        table.integer('NUM_INTENTOS').defaultTo(5).notNullable();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('COD_DISTRITO').references('CODIGO').inTable('TBL_DISTRITO');
        table.foreign('COD_CENTRO_POBLADO').references('CODIGO').inTable('TBL_CENTRO_POBLADO');
        table.foreign('COD_COMUNIDAD_CAMPESINA').references('CODIGO').inTable('TBL_COMUNIDAD_CAMPESINA');
        table.foreign('COD_COMUNIDAD_NATIVA').references('CODIGO').inTable('TBL_COMUNIDAD_NATIVA');
      })
      // Crear tabla de Relaciones entre Usuarios y Roles
      .createTable('TBL_USUARIO_ROL', table => {
        table.integer('ID_USUARIO').unsigned().notNullable();
        table.integer('ID_ROL').unsigned().notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.primary(['ID_USUARIO', 'ID_ROL']);
        table.foreign('ID_USUARIO').references('ID_USUARIO').inTable('TBL_USUARIO');
        table.foreign('ID_ROL').references('ID_ROL').inTable('TBL_ROL');
      })
      // Crear tabla de Rubros
      .createTable('TBL_RUBRO', table => {
        table.increments('ID_RUBRO').unsigned().primary();
        table.string('TIPO_RUBRO', 50).unique().notNullable();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
      })
      // Crear tabla de Tipos de Movimiento
      .createTable('TBL_TIPO_MOVIMIENTO', table => {
        table.increments('ID_TIPO_MOV').unsigned().primary();
        table.string('CONCEPTO', 255).unique().notNullable();
        table.integer('ID_RUBRO').unsigned().notNullable();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('ID_RUBRO').references('ID_RUBRO').inTable('TBL_RUBRO');
      })
      // Crear tabla de Medidores
      .createTable('TBL_MEDIDOR', table => {
        table.increments('ID_MEDIDOR').unsigned().primary();
        table.string('COD_MEDIDOR', 255).unique().notNullable();
        table.integer('ID_USUARIO').unsigned();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('ID_USUARIO').references('ID_USUARIO').inTable('TBL_USUARIO');
      })
      // Crear tabla de Tarifas
      .createTable('TBL_TARIFA', table => {
        table.increments('ID_TARIFA').unsigned().primary();
        table.string('COD_TARIFA', 20).unique().notNullable();
        table.string('DESCRIPCION', 50).notNullable();
        table.decimal('MONTO_TARIFA', 10, 2).notNullable();
        table.decimal('M3_CONSUMO', 10, 2).notNullable();
        table.decimal('MONTO_EXTRA_POR_M3', 10, 2).notNullable();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
      })
      // Crear tabla de Lecturas
      .createTable('TBL_LECTURA', table => {
        table.increments('ID_LECTURA').unsigned().primary();
        table.integer('ID_MEDIDOR').unsigned().notNullable();
        table.decimal('LECTURA_ACTUAL', 10, 3).notNullable();
        table.decimal('LECTURA_ANTERIOR', 10, 3);
        table.decimal('M3_CONSUMIDO', 10, 2).notNullable();
        table.integer('ID_TARIFA').notNullable();
        table.decimal('MONTO_PAGAR', 10, 2).notNullable();
        table.decimal('PORC_DESCUENTO', 10, 2).defaultTo(0);
        table.decimal('MONTO_MULTA', 10, 2).defaultTo(0);
        table.string('NUM_RECIBO', 20).unique().notNullable();
        table.date('FECHA_LECTURA').notNullable();
        table.date('FECHA_LIMT_PAGO').notNullable();
        table.date('FECHA_CORTE');
        table.string('COMENTARIO', 255);
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('ID_MEDIDOR').references('ID_MEDIDOR').inTable('TBL_MEDIDOR');
      })
      // Crear tabla de Pagos de Recibos
      .createTable('TBL_PAGO_RECIBO', table => {
        table.increments('ID_PAGO_RECIBO').unsigned().primary();
        table.date('FECHA_PAGO');
        table.decimal('MONTO_PAGO', 10, 2);
        table.integer('ID_LECTURA').unsigned().notNullable();
        table.string('NUM_COMPROBANTE', 50);
        table.string('COMENTARIO', 255);
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('ID_LECTURA').references('ID_LECTURA').inTable('TBL_LECTURA');
      })
      // Crear tabla de Caja
      .createTable('TBL_CAJA', table => {
        table.increments('ID_CAJA').unsigned().primary();
        table.string('NUM_COMPROBANTE', 50);
        table.integer('ID_TIPO_MOV').unsigned().notNullable();
        table.date('FECHA_MOVIMIENTO').notNullable();
        table.string('DESCRIPCION', 255);
        table.decimal('MONTO', 10, 2).notNullable();
        table.integer('ID_PAGO_RECIBO').unsigned();
        table.string('ESTADO', 20).notNullable();
        table.timestamp('FEC_CREACION').defaultTo(knex.fn.now());
        table.timestamp('FEC_ACTUALIZACION').defaultTo(knex.fn.now());
        table.foreign('ID_TIPO_MOV').references('ID_TIPO_MOV').inTable('TBL_TIPO_MOVIMIENTO');
        table.foreign('ID_PAGO_RECIBO').references('ID_PAGO_RECIBO').inTable('TBL_PAGO_RECIBO');
      })
};

export const down = async function (knex) {
  await knex.schema.dropTableIfExists('TBL_SECTOR');
  await knex.schema.dropTableIfExists('TBL_UBIGEO');
  await knex.schema.dropTableIfExists('TBL_CAJA');
  await knex.schema.dropTableIfExists('TBL_PAGO_RECIBO');
  await knex.schema.dropTableIfExists('TBL_LECTURA');
  await knex.schema.dropTableIfExists('TBL_TARIFA');
  await knex.schema.dropTableIfExists('TBL_MEDIDOR');
  await knex.schema.dropTableIfExists('TBL_TIPO_MOVIMIENTO');
  await knex.schema.dropTableIfExists('TBL_RUBRO');
  await knex.schema.dropTableIfExists('TBL_USUARIO_ROL');
  await knex.schema.dropTableIfExists('TBL_USUARIO');
  await knex.schema.dropTableIfExists('TBL_ROL_PERMISO');
  await knex.schema.dropTableIfExists('TBL_PERMISO');
  await knex.schema.dropTableIfExists('TBL_ROL');
  await knex.schema.dropTableIfExists('TBL_COMUNIDAD_NATIVA');
  await knex.schema.dropTableIfExists('TBL_COMUNIDAD_CAMPESINA');
  await knex.schema.dropTableIfExists('TBL_CENTRO_POBLADO');
  await knex.schema.dropTableIfExists('TBL_DISTRITO');
  await knex.schema.dropTableIfExists('TBL_PROVINCIA');
  await knex.schema.dropTableIfExists('TBL_DEPARTAMENTO');
};