import { createUserSchema } from '@/schemas/user.schema';
import { usersService } from '@/services/users/users.service';
import { CreateUserDTO } from '@/types/models/user.types';
import { createErrorResponse } from '@/utils/zodErrors';
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
		const validatedUser = createUserSchema.safeParse(userData);
		if (!validatedUser.success) {
			return NextResponse.json(createErrorResponse(validatedUser.error), {
				status: 400,
			});
		}
		await usersService.create(validatedUser.data);
		return NextResponse.json({ status: 201 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: `Failed to create user: ${error}` },
			{ status: 500 }
		);
	}
}
