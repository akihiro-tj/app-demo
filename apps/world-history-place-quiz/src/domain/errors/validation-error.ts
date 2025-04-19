import type { z } from "zod";

export class ValidationError extends Error {
	constructor(
		message: string,
		public readonly errors: z.ZodError[],
	) {
		super(message);
		this.name = "ValidationError";
	}
}
