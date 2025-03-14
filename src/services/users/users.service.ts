import { User } from '@/db/models/user.model';
import {
	CreateUserDTO,
	IUser,
	LoginDTO,
	LoginResponse,
	PROFILE_PRIVACY,
	UpdatePreferencesDTO,
	UpdateUserDTO,
	UserPreferences,
} from '@/types/models/user.types';
import bcrypt from 'bcryptjs';

const BASE_URL = '/api/users';

export const usersService = {
	async getAll(): Promise<IUser[]> {
		return User.findAll();
	},

	async getById(id: string): Promise<IUser | null> {
		return User.findByPk(id);
	},

	async create(userData: CreateUserDTO): Promise<IUser> {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		return User.create({
			...userData,
			password: hashedPassword,
			preferences: {
				theme: 'light',
				notifications: { email: true, push: true },
				privacy: {
					show_profile_picture: true,
					allow_friends_request: true,
					profile_privacy: PROFILE_PRIVACY.PUBLIC,
				},
			},
			is_email_verified: false,
		});
	},

	async update(id: string, userData: UpdateUserDTO): Promise<IUser | null> {
		const user = await User.findByPk(id);
		if (!user) return null;
		await user.update(userData);
		return user;
	},

	async updatePassword(
		id: string,
		{
			currentPassword,
			newPassword,
		}: { currentPassword: string; newPassword: string }
	): Promise<{ success: boolean; message: string }> {
		const user = await User.findByPk(id);
		if (!user) {
			return { success: false, message: 'Usuario no encontrado' };
		}

		const isValidPassword = await this.validatePassword(
			user,
			currentPassword
		);
		if (!isValidPassword) {
			return { success: false, message: 'Contraseña actual incorrecta' };
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await user.update({ password: hashedPassword });

		return {
			success: true,
			message: 'Contraseña actualizada correctamente',
		};
	},

	async updatePreferences(
		id: string,
		newPreferences: Partial<UpdatePreferencesDTO>
	) {
		const user = await User.findByPk(id);
		if (!user) return null;

		const cleanPreferences = {
			theme: newPreferences.theme || user.preferences?.theme || 'light',
			notifications: {
				email:
					newPreferences.notifications?.email ??
					user.preferences?.notifications?.email ??
					false,
				push:
					newPreferences.notifications?.push ??
					user.preferences?.notifications?.push ??
					false,
			},
			privacy: {
				show_profile_picture:
					newPreferences.privacy?.show_profile_picture ??
					user.preferences?.privacy?.show_profile_picture ??
					false,
				allow_friends_request:
					newPreferences.privacy?.allow_friends_request ??
					user.preferences?.privacy?.allow_friends_request ??
					false,
				profile_privacy:
					newPreferences.privacy?.profile_privacy ??
					user.preferences?.privacy?.profile_privacy ??
					'PRIVATE',
			},
		};

		await user.update({ preferences: cleanPreferences });
		return cleanPreferences; // Retorna solo las preferencias limpias
	},

	async getPreferences(id: string): Promise<UserPreferences | null> {
		const user = await User.findByPk(id);
		if (!user) return null;
		return user.preferences;
	},

	async delete(id: string): Promise<boolean> {
		const deleted = await User.destroy({ where: { id } });
		return deleted > 0;
	},

	async findByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ where: { email } });
	},

	async validatePassword(user: IUser, password: string): Promise<boolean> {
		return bcrypt.compare(password, user.password);
	},

	async login(credentials: LoginDTO): Promise<LoginResponse> {
		const response = await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		});
		if (!response.ok) throw new Error('Failed to login');
		return response.json();
	},

	async getCurrentUser(): Promise<IUser> {
		const response = await fetch(`${BASE_URL}/me`);
		if (!response.ok) throw new Error('Failed to fetch current user');
		return response.json();
	},
};
