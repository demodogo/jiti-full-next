import { ZodError } from 'zod';

interface FormattedZodError {
	field: string;
	message: string;
}

export const formatZodErrors = (error: ZodError): FormattedZodError[] => {
	return error.issues.map((issue) => ({
		field: issue.path.join('.'),
		message: issue.message,
	}));
};

export const createErrorResponse = (error: ZodError) => {
	return {
		success: false,
		errors: formatZodErrors(error),
	};
};
