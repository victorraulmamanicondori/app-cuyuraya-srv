import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: '127.0.0.1',
	database: 'CUYURAYA',
	user: 'root',
	password: 'admin',
	port: 3306,
	connectionLimit: 5
});

export default pool;
