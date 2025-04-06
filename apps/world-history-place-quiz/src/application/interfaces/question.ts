import type { IQuestion } from "@/domain/entities/question";

export interface Question {
	statement: string;
	image: string;
	choices: string[];
	correctChoice: IQuestion["correctChoice"];
	explanation: string;
}
