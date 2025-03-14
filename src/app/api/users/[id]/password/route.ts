import { usersService } from '@/services/users/users.service';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		id: string;
	};
}

export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = params;
		const { currentPassword, newPassword } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: 'ID is required' },
				{ status: 400 }
			);
		}

		if (!currentPassword || !newPassword) {
			return NextResponse.json(
				{ error: 'Se requieren ambas contraseñas' },
				{ status: 400 }
			);
		}

		const result = await usersService.updatePassword(id, {
			currentPassword,
			newPassword,
		});

		if (!result.success) {
			return NextResponse.json(
				{ error: result.message },
				{ status: 400 }
			);
		}

		return NextResponse.json({ message: result.message });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error al actualizar la contraseña' },
			{ status: 500 }
		);
	}
}
