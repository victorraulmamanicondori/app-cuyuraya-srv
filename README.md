# Sistema de Gestión de Agua Potable Rural

**Sistema de Gestión de Agua Potable Rural para la Comunidad de Cuyuraya, Puno, Perú**

Este proyecto proporciona una API para gestionar el sistema de agua potable en la comunidad de Cuyuraya. Se trata de una aplicación backend basada en Node.js y Express.js, que permite la gestión de usuarios, registros y servicios relacionados con el sistema de agua potable rural.

## Funcionalidades

- **Gestión de Usuarios**: Registro, autenticación y autorización de usuarios.
- **Autenticación JWT**: Seguridad mediante JSON Web Tokens.
- **Logs**: Uso de Winston para registro de logs.
- **Gestión de Departamento**: Registro, actualizacion, eliminacion, y listado de departamentos.
- **Gestión de Provincias**: Registro, actualizacion, eliminacion, y listado de provincias.
- **Gestión de Distritos**: Registro, actualizacion, eliminacion, y listado de distritos.
- **Gestión de Comunidades Campesinas**: Registro, actualizacion, eliminacion, y listado de comunidades campesinas.
- **Gestión de Comunidades Nativas**: Registro, actualizacion, eliminacion, y listado de comunidades nativas.
- **Gestión de Centros Poblados**: Registro, actualizacion, eliminacion, y listado de centros poblados.
- **Gestión de Caja**: Registro de caja y generación de reportes por rubro.
- **Gestión de Lecturas**: Listado, registro, actualización, eliminación, registro de pago de recibos, e impresión de recibos.
- **Login**: Permite el ingreso al sistema.
- **Gestión de Medidores**: Asignar medidor al usuario, desasignar medidor, obtener datos medidor por dni y código medidor.
- **Gestión de Permisos**: Registro, actualizacion, listado, eliminación de permisos a los roles y usuarios.
- **Gestión de Roles**: Listar, crear, actualizar, y eliminar roles.
- **Gestión de Tarifas**: Permite listar, crear, actualizar, y eliminar tarifas de consumos de agua.
- **Gestión de Tipos de Movimientos**: Permite listar tipos de movimientos en la caja.

## Requisitos

- **Node.js**: Versión 16 o superior
- **MySQL**: Base de datos configurada y operativa
- **NPM**: Node Package Manager para la instalación de dependencias

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/victorraulmamanicondori/app-cuyuraya-srv.git 
   cd app-cuyuraya-srv
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear la base de datos:
   ```bash
   npm run create:db
   ```

4. Ejecutar migraciones y semillas:
   ```bash
   npm run setup:db
   ```

5. Iniciar el servidor:
   ```bash
   npm start
   ```

## Scripts

- **start**: Inicia el servidor.
- **test**: Ejecuta las pruebas automatizadas con Mocha.
- **create:db**: Crea la base de datos.
- **setup:db**: Configura la base de datos (ejecuta migraciones y semillas).
- **rollback:db**: Revierte la última migración.

## Dependencias

Este proyecto usa las siguientes librerías:

### Dependencias

- **bcrypt**: Hashing de contraseñas.
- **body-parser**: Middleware para analizar cuerpos de solicitudes HTTP.
- **cors**: Habilitar Cross-Origin Request Sharing.
- **dotenv**: Cargar variables de entorno desde un archivo `.env`.
- **express**: Framework web para Node.js.
- **jsonwebtoken**: Generación y verificación de tokens JWT.
- **knex**: SQL query builder para Node.js.
- **mysql2**: Conector para MySQL.
- **pdfkit**: Generación de documentos PDF.
- **winston**: Logger para Node.js.
- **winston-daily-rotate-file**: Rotación diaria de archivos de logs.

### Dependencias de Desarrollo

- **chai**: Framework de aserciones para pruebas.
- **chai-http**: Plugin de Chai para realizar solicitudes HTTP.
- **mocha**: Framework de pruebas para Node.js.
- **supertest**: Utilidad para pruebas de API HTTP.

## Licencia

Este proyecto está bajo la Licencia de Uso y Distribución. Consulta el archivo LICENSE para más detalles.

