import { Model, Optional } from 'sequelize';

export enum PROFILE_PRIVACY {
	PUBLIC = 'public',
	PRIVATE = 'private',
	FRIENDS_ONLY = 'friends_only',
}

export type UserPreferences = {
	theme: 'light' | 'dark';
	notifications: {
		email: boolean;
		push: boolean;
	};
	privacy: {
		show_profile_picture: boolean;
		allow_friends_request: boolean;
		profile_privacy: PROFILE_PRIVACY;
	};
};

export interface IUser {
	id: string;
	email: string;
	password: string;
	username: string;
	name?: string;
	lastname?: string;
	avatar_url?: string;
	preferences: UserPreferences;
	is_email_verified: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export interface IUserCreationAttributes
	extends Optional<
		IUser,
		| 'id'
		| 'created_at'
		| 'updated_at'
		| 'preferences'
		| 'avatar_url'
		| 'name'
		| 'lastname'
	> {}

export interface IUserInstance
	extends Model<IUser, IUserCreationAttributes>,
		IUser {}

export type CreateUserDTO = Pick<IUser, 'email' | 'password' | 'username'> & {
	name?: string;
	lastname?: string;
};

export type UpdateUserDTO = Partial<
	Pick<IUser, 'email' | 'username' | 'name' | 'lastname' | 'preferences'>
>;

export type UpdatePreferencesDTO = Partial<UserPreferences>;

export type LoginDTO = Pick<IUser, 'email' | 'password'>;

export interface LoginResponse {
	token: string;
	user: Omit<IUser, 'password'>;
}
