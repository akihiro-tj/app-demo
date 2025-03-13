import type { RawQuestion } from "@/schemas/question";

export interface IQuestion {
	statement: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;
}

export interface CorrectChoice {
	value: number;
	text: string;
}

export class Question implements IQuestion {
	statement: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;

	constructor(rawQuestion: RawQuestion) {
		this.statement = rawQuestion.statement;
		this.choices = rawQuestion.choices;
		this.correctChoice = {
			value: rawQuestion.correctChoice,
			text: rawQuestion.choices[rawQuestion.correctChoice] ?? "",
		};
		this.explanation = rawQuestion.explanation;
	}
}
