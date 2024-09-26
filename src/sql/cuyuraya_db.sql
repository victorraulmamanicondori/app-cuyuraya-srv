CREATE DATABASE CUYURAYA;

USE CUYURAYA;

-- Tabla de Departamentos
CREATE TABLE TBL_DEPARTAMENTO (
  CODIGO VARCHAR(2) NOT NULL,
  NOMBRE VARCHAR(255) NOT null,
  CONSTRAINT PK_DEPARTAMENTO PRIMARY KEY (CODIGO)
);

-- Tabla de Provincias
CREATE TABLE TBL_PROVINCIA (
  CODIGO VARCHAR(4) NOT NULL,
  NOMBRE VARCHAR(255) NOT NULL,
  CONSTRAINT PK_PROVINCIA PRIMARY KEY (CODIGO)
);

-- Tabla de Distritos
CREATE TABLE TBL_DISTRITO (
  CODIGO VARCHAR(6) NOT NULL,
  NOMBRE VARCHAR(255) NOT NULL,
  CONSTRAINT PK_DISTRITO PRIMARY KEY (CODIGO)
);

-- Tabla de Centros Poblados (opcional)
CREATE TABLE TBL_CENTRO_POBLADO (
  CODIGO VARCHAR(10) NOT NULL,
  NOMBRE VARCHAR(100) NOT NULL,
  AREA VARCHAR(100),
  CONSTRAINT PK_CENTRO_POBLADO PRIMARY KEY (CODIGO)
);

-- Tabla de Comunidades Campesinas/Parcialidad (opcional)
CREATE TABLE TBL_COMUNIDAD_CAMPESINA (
  CODIGO VARCHAR(10) NOT NULL,
  NOMBRE VARCHAR(100) NOT NULL,
  CONSTRAINT PK_COMUNIDAD_CAMPESINA PRIMARY KEY (CODIGO)
);

-- Tabla de Comunidad Nativa
CREATE TABLE TBL_COMUNIDAD_NATIVA (
  CODIGO VARCHAR(10) NOT NULL,
  NOMBRE VARCHAR(100) NOT NULL,
  FAM_LINGUISTICA VARCHAR(100),
  ETNIA VARCHAR(100),
  CONSTRAINT PK_COMUNIDAD_NATIVA PRIMARY KEY (CODIGO)
);

-- Tabla de Roles
CREATE TABLE TBL_ROL (
  ID_ROL INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(20) UNIQUE NOT NULL,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TBL_PERMISO (
  ID_PERMISO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(100) UNIQUE NOT NULL,
  DESCRIPCION VARCHAR(255) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TBL_ROL_PERMISO (
  ID_ROL INT NOT NULL,
  ID_PERMISO INT NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_ROL_PERMISO_ROL FOREIGN KEY (ID_ROL) REFERENCES TBL_ROL(ID_ROL),
  CONSTRAINT FK_ROL_PERMISO_PERMISO FOREIGN KEY (ID_PERMISO) REFERENCES TBL_PERMISO(ID_PERMISO),
  PRIMARY KEY (ID_ROL, ID_PERMISO)
);

-- Tabla de Usuarios
CREATE TABLE TBL_USUARIO (
  ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRES VARCHAR(255) NOT NULL,
  PATERNO VARCHAR(255) NOT NULL,
  MATERNO VARCHAR(255) NOT NULL,
  DNI VARCHAR(8) UNIQUE NOT NULL,
  DIRECCION VARCHAR(255) NOT NULL,
  NUM_CONTRATO VARCHAR(255),
  TELEFONO VARCHAR(20),
  CLAVE VARCHAR(255) NOT NULL,
  COD_DISTRITO VARCHAR(6) NOT NULL,
  COD_CENTRO_POBLADO VARCHAR(10), -- opcional
  COD_COMUNIDAD_CAMPESINA VARCHAR(10), -- opcional
  COD_COMUNIDAD_NATIVA VARCHAR(10), -- opcional
  NUM_INTENTOS INT NOT NULL DEFAULT 5,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_USUARIO_DISTRITO FOREIGN KEY (COD_DISTRITO) REFERENCES TBL_DISTRITO(CODIGO),
  CONSTRAINT FK_USUARIO_CENTRO_POBLADO FOREIGN KEY (COD_CENTRO_POBLADO) REFERENCES TBL_CENTRO_POBLADO(CODIGO),
  CONSTRAINT FK_USUARIO_COMUNIDAD_CAMPESINA FOREIGN KEY (COD_COMUNIDAD_CAMPESINA) REFERENCES TBL_COMUNIDAD_CAMPESINA(CODIGO),
  CONSTRAINT FK_USUARIO_COMUNIDAD_NATIVA FOREIGN KEY (COD_COMUNIDAD_NATIVA) REFERENCES TBL_COMUNIDAD_NATIVA(CODIGO)
);

CREATE TABLE TBL_USUARIO_ROL (
  ID_USUARIO INT NOT NULL,
  ID_ROL INT NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_USUARIO FOREIGN KEY (ID_USUARIO) REFERENCES TBL_USUARIO(ID_USUARIO),
  CONSTRAINT FK_ROL FOREIGN KEY (ID_ROL) REFERENCES TBL_ROL(ID_ROL),
  PRIMARY KEY (ID_USUARIO, ID_ROL)
);

-- Tabla de Rubros
CREATE TABLE TBL_RUBRO (
  ID_RUBRO INT AUTO_INCREMENT PRIMARY KEY,
  TIPO_RUBRO VARCHAR(50) UNIQUE NOT NULL,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Tipos de Movimiento
CREATE TABLE TBL_TIPO_MOVIMIENTO (
  ID_TIPO_MOV INT AUTO_INCREMENT PRIMARY KEY,
  CONCEPTO VARCHAR(255) UNIQUE NOT NULL,
  ID_RUBRO INT NOT NULL,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK1_TIPO_MOVIMIENTO FOREIGN KEY (ID_RUBRO) REFERENCES TBL_RUBRO(ID_RUBRO)
);

-- Tabla de Medidores
CREATE TABLE TBL_MEDIDOR (
  ID_MEDIDOR INT AUTO_INCREMENT PRIMARY KEY,
  COD_MEDIDOR VARCHAR(255) UNIQUE NOT NULL,
  ID_USUARIO INT,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK1_MEDIDOR FOREIGN KEY (ID_USUARIO) REFERENCES TBL_USUARIO(ID_USUARIO)
);

-- Tabla de Tarifas
CREATE TABLE TBL_TARIFA (
  ID_TARIFA INT AUTO_INCREMENT PRIMARY KEY,
  COD_TARIFA VARCHAR(20) UNIQUE NOT NULL,
  DESCRIPCION VARCHAR(50) NOT NULL,
  MONTO_TARIFA DECIMAL(10,2) NOT NULL,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Lecturas
CREATE TABLE TBL_LECTURA (
  ID_LECTURA INT AUTO_INCREMENT PRIMARY KEY,
  ID_MEDIDOR INT NOT NULL,
  LECTURA_ACTUAL BIGINT NOT NULL,
  LECTURA_ANTERIOR BIGINT,
  M3_CONSUMIDO DECIMAL(10,2) NOT NULL,
  ID_TARIFA INT NOT NULL,
  MONTO_PAGAR DECIMAL(10,2) NOT NULL,
  PORC_DESCUENTO DECIMAL(10,2) DEFAULT 0,
  MONTO_MULTA DECIMAL(10,2) DEFAULT 0,
  NUM_RECIBO VARCHAR(20) UNIQUE NOT NULL,
  FECHA_LIMT_PAGO DATE NOT NULL,
  FECHA_CORTE DATE,
  COMENTARIO VARCHAR(255),
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK1_LECTURA FOREIGN KEY (ID_MEDIDOR) REFERENCES TBL_MEDIDOR(ID_MEDIDOR)
);

-- Tabla de Pagos de Recibos
CREATE TABLE TBL_PAGO_RECIBO (
  ID_PAGO_RECIBO INT AUTO_INCREMENT PRIMARY KEY,
  FECHA_PAGO DATE,
  MONTO_PAGO DECIMAL(10,2),
  ID_LECTURA INT NOT NULL,
  NUM_COMPROBANTE VARCHAR(50),
  COMENTARIO VARCHAR(255),
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK1_PAGO_RECIBO FOREIGN KEY (ID_LECTURA) REFERENCES TBL_LECTURA(ID_LECTURA)
);

-- Tabla de Caja
CREATE TABLE TBL_CAJA (
  ID_CAJA INT AUTO_INCREMENT PRIMARY KEY,
  NUM_COMPROBANTE VARCHAR(50),
  ID_TIPO_MOV INT NOT NULL,
  FECHA_MOVIMIENTO DATE NOT NULL,
  DESCRIPCION VARCHAR(255),
  MONTO DECIMAL(10,2) NOT NULL,
  ID_PAGO_RECIBO INT,
  ESTADO VARCHAR(20) NOT NULL,
  FEC_CREACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FEC_ACTUALIZACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK1_CAJA FOREIGN KEY (ID_TIPO_MOV) REFERENCES TBL_TIPO_MOVIMIENTO(ID_TIPO_MOV),
  CONSTRAINT FK2_CAJA FOREIGN KEY (ID_PAGO_RECIBO) REFERENCES TBL_PAGO_RECIBO(ID_PAGO_RECIBO)
);

-- Inserción de datos iniciales
INSERT INTO TBL_ROL (NOMBRE, ESTADO) VALUES ('administrador', 'activo');
INSERT INTO TBL_ROL (NOMBRE, ESTADO) VALUES ('operador', 'activo');
INSERT INTO TBL_ROL (NOMBRE, ESTADO) VALUES ('invitado', 'activo');

-- Insertar Permisos
INSERT INTO TBL_PERMISO (NOMBRE, DESCRIPCION) VALUES ('GESTIONAR_USUARIOS', 'Permite gestionar usuarios');
INSERT INTO TBL_PERMISO (NOMBRE, DESCRIPCION) VALUES ('VER_REPORTES', 'Permite ver reportes');
INSERT INTO TBL_PERMISO (NOMBRE, DESCRIPCION) VALUES ('REGISTRAR_LECTURA', 'Permite registrar lecturas de medidores');
INSERT INTO TBL_PERMISO (NOMBRE, DESCRIPCION) VALUES ('PAGAR_RECIBOS', 'Permite pagar recibos');

-- Asignar permisos al Administrador
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (1, 1); -- GESTIONAR_USUARIOS
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (1, 2); -- VER_REPORTES
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (1, 3); -- REGISTRAR_LECTURA
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (1, 4); -- PAGAR_RECIBOS

-- Asignar permisos al Operador
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (2, 2); -- VER_REPORTES
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (2, 3); -- REGISTRAR_LECTURA

-- Asignar permisos al Consumidor
INSERT INTO TBL_ROL_PERMISO (ID_ROL, ID_PERMISO) VALUES (3, 4); -- PAGAR_RECIBOS

-- Insertar tarifa base
INSERT INTO TBL_TARIFA (COD_TARIFA, DESCRIPCION, MONTO_TARIFA, ESTADO) VALUES ('BASE', 'Tarifa base', 5.0, 'ACTIVO');

-- Insertar rubros de actividad economica
INSERT INTO TBL_RUBRO (TIPO_RUBRO, ESTADO) VALUES ('Ingreso', 'ACTIVO');
INSERT INTO TBL_RUBRO (TIPO_RUBRO, ESTADO) VALUES ('Egreso', 'ACTIVO');

INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Pago de Mora', 1, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Otros Ingreso', 1, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Instalaciones Nuevas', 1, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Operador del Sistema', 2, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Herramientas', 2, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Viaticos y Pasajes', 2, 'ACTIVO');
INSERT INTO TBL_TIPO_MOVIMIENTO (CONCEPTO, ID_RUBRO, ESTADO) VALUES ('Combustibles y lubricantes', 2, 'ACTIVO');
