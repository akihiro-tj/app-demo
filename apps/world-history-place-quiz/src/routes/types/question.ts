import type { CorrectChoice } from "@/entities/question";

export interface Question {
	statement: string;
	image: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;
}
