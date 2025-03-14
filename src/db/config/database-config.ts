import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface DatabaseConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	port: number;
	dialect: Dialect;
	logging: boolean | ((sql: string) => void);
	define: {
		timestamps: boolean;
		underscored: boolean;
	};
	dialectOptions?: {
		ssl?: {
			require: boolean;
			rejectUnauthorized: boolean;
		};
	};
}

interface Config {
	development: DatabaseConfig;
	test: DatabaseConfig;
	production: DatabaseConfig;
}

const config: Config = {
	development: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'jiti_dev',
		host: process.env.DB_HOST || '127.0.0.1',
		port: parseInt(process.env.DB_PORT || '5432'),
		dialect: 'postgres',
		logging: console.log,
		define: {
			timestamps: true,
			underscored: true,
		},
	},
	test: {
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'jiti_test',
		host: process.env.DB_HOST || '127.0.0.1',
		port: parseInt(process.env.DB_PORT || '5432'),
		dialect: 'postgres',
		logging: false,
		define: {
			timestamps: true,
			underscored: true,
		},
	},
	production: {
		username: process.env.DB_USER!,
		password: process.env.DB_PASSWORD!,
		database: process.env.DB_NAME!,
		host: process.env.DB_HOST!,
		port: parseInt(process.env.DB_PORT!),
		dialect: 'postgres',
		logging: false,
		define: {
			timestamps: true,
			underscored: true,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};

export default config;
