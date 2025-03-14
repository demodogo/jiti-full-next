import { IUserInstance, PROFILE_PRIVACY } from '@/types/models/user.types';
import { DataTypes } from 'sequelize';
import sequelize from '../database';

export const User = sequelize.define<IUserInstance>(
	'User',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				len: [3, 50],
			},
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		lastname: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		avatar_url: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		preferences: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: {
				theme: 'light',
				notifications: {
					email: true,
					push: true,
				},
				privacy: {
					show_profile_picture: true,
					allow_friends_request: true,
					profile_privacy: PROFILE_PRIVACY.PUBLIC,
				},
			},
		},
		is_email_verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: 'users',
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);
