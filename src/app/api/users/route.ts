import { usersService } from '@/services/users/users.service';
import { CreateUserDTO } from '@/types/models/user.types';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const users = await usersService.getAll();
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch users' },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const userData: CreateUserDTO = await request.json();
		await usersService.create(userData);
		return NextResponse.json({ status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: `Failed to create user: ${error}` },
			{ status: 500 }
		);
	}
}
