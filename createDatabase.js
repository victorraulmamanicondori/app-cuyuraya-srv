import knex from 'knex';
import config from './knexfile.js';

const createDatabase = async () => {
  const dev = {...config.development};
  dev.connection.database = 'mysql';

  const dbName = config.development.connection.database;

  const knexInstance = knex(dev);

  try {
    const [databases] = await knexInstance.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (databases.length === 0) {
      await knexInstance.raw(`CREATE DATABASE ${dbName}`);
      console.log(`Base de datos '${dbName}' creada exitosamente.`);
    } else {
      console.log(`La base de datos '${dbName}' ya existe.`);
    }
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  } finally {
    await knexInstance.destroy();
  }
};

createDatabase();
