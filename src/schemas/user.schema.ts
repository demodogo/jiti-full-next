import { PROFILE_PRIVACY } from '@/types/models/user.types';
import { z } from 'zod';

const notificationsSchema = z.object({
	email: z.boolean(),
	push: z.boolean(),
});

const privacySchema = z.object({
	show_profile_picture: z.boolean(),
	allow_friends_request: z.boolean(),
	profile_privacy: z.enum([
		PROFILE_PRIVACY.PUBLIC,
		PROFILE_PRIVACY.PRIVATE,
		PROFILE_PRIVACY.FRIENDS_ONLY,
	]),
});

export const createUserSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
	username: z
		.string()
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
});

export const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const updateUserSchema = z.object({
	name: z.string().min(2).optional(),
	lastname: z.string().min(2).optional(),
	username: z.string().min(3).optional(),
	avatar_url: z.string().url().optional(),
});

export const updatePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
	newPassword: z
		.string()
		.min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
});

// Esquema para actualizar preferencias
export const updatePreferencesSchema = z.object({
	theme: z.enum(['light', 'dark']).optional(),
	notifications: notificationsSchema.partial().optional(),
	privacy: privacySchema.partial().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type UpdatePreferencesSchema = z.infer<typeof updatePreferencesSchema>;
