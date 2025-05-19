import type { z } from "zod";
import { ValidationError } from "../../../domain/errors/validation-error";

export const validateSchema = <T>(
	schema: z.ZodSchema<T>,
	data: unknown,
	filePath: string,
): T => {
	const result = schema.safeParse(data);
	if (!result.success) {
		throw new ValidationError(`Invalid data: '${filePath}'`, [result.error]);
	}
	return result.data;
};
