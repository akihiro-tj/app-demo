import { z } from "zod";

export const questionSchema = z.object({
	statement: z.string(),
	choices: z.array(z.string()),
	correctChoice: z.number().int(),
	explanation: z.string(),
});
