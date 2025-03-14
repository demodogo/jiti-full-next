import { usersService } from '@/services/users/users.service';
import { UpdateUserDTO } from '@/types/models/user.types';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const user = await usersService.getById(params.id);
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch user' },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const userData: UpdateUserDTO = await request.json();
		const user = await usersService.update(params.id, userData);

		if (!user) {
			return NextResponse.json(
				{ error: 'Usuario no encontrado' },
				{ status: 404 }
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to update user' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const deleted = await usersService.delete(params.id);
		if (!deleted) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}
		return NextResponse.json({ message: 'User deleted successfully' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to delete user' },
			{ status: 500 }
		);
	}
}
