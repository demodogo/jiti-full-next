import { updatePasswordSchema } from '@/schemas/user.schema';
import { usersService } from '@/services/users/users.service';
import { createErrorResponse } from '@/utils/zodErrors';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		id: string;
	};
}

export async function PUT(request: Request, { params }: Params) {
	try {
		const { id } = params;
		const passwordData = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: 'ID is required' },
				{ status: 400 }
			);
		}

		const validatedPassword = updatePasswordSchema.safeParse(passwordData);
		if (!validatedPassword.success) {
			return NextResponse.json(
				createErrorResponse(validatedPassword.error),
				{
					status: 400,
				}
			);
		}

		const result = await usersService.updatePassword(id, {
			currentPassword: validatedPassword.data.currentPassword,
			newPassword: validatedPassword.data.newPassword,
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
