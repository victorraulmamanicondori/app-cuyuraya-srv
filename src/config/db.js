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
