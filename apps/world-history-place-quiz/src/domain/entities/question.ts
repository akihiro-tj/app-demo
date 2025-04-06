import type { RawQuestion } from "../schemas/question";

export interface IQuestion {
	statement: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;
}

interface CorrectChoice {
	value: number;
	text: string;
}

export class Question implements IQuestion {
	readonly statement: IQuestion["statement"];
	readonly choices: IQuestion["choices"];
	readonly correctChoice: IQuestion["correctChoice"];
	readonly explanation: IQuestion["explanation"];

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
