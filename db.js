const mysql = require('mariadb');

const pool = mysql.createPool({
	host: '127.0.0.1',
	database: 'CUYURAYA',
	user: 'root',
	password: 'admin',
	port: 3306,
	connectionLimit: 5
});

module.exports = pool;
