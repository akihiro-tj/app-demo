import { z } from "zod";

export interface RawQuestion {
	statement: string;
	choices: string[];
	correctChoice: number;
	explanation: string;
}

export const rawQuestionSchema = z.object({
	statement: z.string(),
	choices: z.array(z.string()),
	correctChoice: z.number(),
	explanation: z.string(),
});
