import pg from 'pg';
import { Sequelize } from 'sequelize';
import config from './config/database-config';
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
		dialect: dbConfig.dialect,
		dialectModule: pg,
		logging: dbConfig.logging,
		define: dbConfig.define,
		dialectOptions: dbConfig.dialectOptions,
	}
);

export const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexión a la base de datos establecida correctamente.');
	} catch (error) {
		console.error('No se pudo conectar a la base de datos:', error);
	}
};

export default sequelize;
