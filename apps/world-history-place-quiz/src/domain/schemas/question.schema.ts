import { z } from "zod";

export const questionSchema = z
	.object({
		statement: z.string().min(1, "Question statement must not be empty"),
		choices: z
			.array(z.string())
			.min(2, "Question must have at least 2 choices"),
		correctChoice: z
			.number()
			.int()
			.nonnegative("Correct choice must be non-negative"),
		explanation: z.string().min(1, "Explanation must not be empty"),
	})
	.refine(
		(data) => data.correctChoice < data.choices.length,
		"Correct choice index must be within choices range",
	);
