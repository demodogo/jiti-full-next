import { updatePreferencesSchema } from '@/schemas/user.schema';
import { usersService } from '@/services/users';
import { createErrorResponse } from '@/utils/zodErrors';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const preferences = await usersService.getPreferences(params.id);

	return NextResponse.json({ preferences });
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const preferencesData = await request.json();

		const validatedPreferences =
			updatePreferencesSchema.safeParse(preferencesData);
		if (!validatedPreferences.success) {
			return NextResponse.json(
				createErrorResponse(validatedPreferences.error),
				{
					status: 400,
				}
			);
		}

		const updatedPreferences = await usersService.updatePreferences(
			id,
			preferencesData
		);

		if (!updatedPreferences) {
			return NextResponse.json(
				{ error: 'Usuario no encontrado' },
				{ status: 404 }
			);
		}
		return NextResponse.json({ updatedPreferences }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json(
			{ error: 'Error al actualizar preferencias' },
			{ status: 500 }
		);
	}
}
