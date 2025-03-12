import type { CorrectChoice } from "@/entities/question";

export interface QuestionForService {
	statement: string;
	image: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;
}
