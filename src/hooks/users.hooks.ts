import {
	CreateUserDTO,
	IUser,
	LoginDTO,
	LoginResponse,
	UpdatePreferencesDTO,
	UpdateUserDTO,
} from '@/types/models/user.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/users';

const api = {
	async getAll(): Promise<IUser[]> {
		const response = await axios.get(API_URL);
		if (response.status !== 200) throw new Error('Failed to fetch users');
		return response.data;
	},

	async getById(id: string): Promise<IUser> {
		const response = await axios.get(`${API_URL}/${id}`);
		if (response.status !== 200) throw new Error('Failed to fetch user');
		return response.data;
	},

	async create(data: CreateUserDTO): Promise<IUser> {
		const response = await axios.post(API_URL, data);
		if (response.status !== 201) throw new Error('Failed to create user');
		return response.data;
	},

	async update(id: string, data: UpdateUserDTO): Promise<IUser> {
		const response = await axios.put(`${API_URL}/${id}`, data);
		if (response.status !== 200) throw new Error('Failed to update user');
		return response.data;
	},

	async updatePassword(
		id: string,
		{
			currentPassword,
			newPassword,
		}: { currentPassword: string; newPassword: string }
	) {
		const response = await axios.put(`${API_URL}/${id}/password`, {
			currentPassword,
			newPassword,
		});
		if (response.status !== 200) {
			const error = await response.data;
			throw new Error(error.error || 'Failed to update password');
		}
		return response.data;
	},

	async updatePreferences(id: string, preferences: UpdatePreferencesDTO) {
		const response = await axios.put(
			`${API_URL}/${id}/preferences`,
			preferences
		);
		if (response.status !== 200)
			throw new Error('Failed to update preferences');
		return response.data;
	},

	async delete(id: string): Promise<void> {
		const response = await axios.delete(`${API_URL}/${id}`);
		if (response.status !== 200) throw new Error('Failed to delete user');
	},

	async login(credentials: LoginDTO): Promise<LoginResponse> {
		const response = await axios.post(`${API_URL}/login`, credentials);
		if (response.status !== 200) throw new Error('Failed to login');
		return response.data;
	},

	async getCurrentUser(): Promise<IUser> {
		const response = await axios.get(`${API_URL}/current`);
		if (response.status !== 200)
			throw new Error('Failed to get current user');
		return response.data;
	},
};

export const useUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: () => api.getAll(),
	});
};

export const useUser = (id: string) => {
	return useQuery({
		queryKey: ['users', id],
		queryFn: () => api.getById(id),
		enabled: !!id,
	});
};

export const useCurrentUser = () => {
	return useQuery<IUser>({
		queryKey: ['currentUser'],
		queryFn: () => api.getCurrentUser(),
	});
};

export const useCreateUser = () => {
	return useMutation({
		mutationFn: (userData: CreateUserDTO) => api.create(userData),
	});
};

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateUserDTO }) =>
			api.update(id, data),
	});
};

export const useUpdatePassword = () => {
	return useMutation({
		mutationFn: ({
			id,
			currentPassword,
			newPassword,
		}: {
			id: string;
			currentPassword: string;
			newPassword: string;
		}) => api.updatePassword(id, { currentPassword, newPassword }),
	});
};

export const useUpdatePreferences = () => {
	return useMutation({
		mutationFn: ({
			id,
			preferences,
		}: {
			id: string;
			preferences: UpdatePreferencesDTO;
		}) => api.updatePreferences(id, preferences),
	});
};

export const useDeleteUser = () => {
	return useMutation({
		mutationFn: (id: string) => api.delete(id),
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: (credentials: LoginDTO) => api.login(credentials),
	});
};
