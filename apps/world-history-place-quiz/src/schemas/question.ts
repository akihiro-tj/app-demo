import { z } from "zod";

export interface RawQuestion {
	statement: string;
	image: string;
	choices: string[];
	correctChoice: number;
	explanation: string;
}

export const rawQuestionSchema = z.object({
	statement: z.string(),
	image: z.string(),
	choices: z.array(z.string()),
	correctChoice: z.number(),
	explanation: z.string(),
});
