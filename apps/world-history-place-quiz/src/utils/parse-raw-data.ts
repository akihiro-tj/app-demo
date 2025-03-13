import type { ZodType } from "zod";

// biome-ignore lint/suspicious/noExplicitAny:
export const parseRawData = <T>(schema: ZodType<T, any>, data: unknown): T => {
	const result = schema.safeParse(data);
	if (result.success) {
		return result.data;
	}
	throw new Error(result.error.errors.join("\n"));
};
