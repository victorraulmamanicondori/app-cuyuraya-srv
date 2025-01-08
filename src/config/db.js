/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: '127.0.0.1',
	database: 'SISTEMAGESTIONAGUA',
	user: 'root',
	password: 'admin',
	port: 3306,
	connectionLimit: 5,
  	waitForConnections: true,
  	queueLimit: 0 
});

export default pool;
