import { z } from "zod";

export const rawQuestionSchema = z.object({
	statement: z.string(),
	choices: z.array(z.string()),
	correctChoice: z.number(),
	explanation: z.string(),
});
