import type { IQuestion, RawQuestion } from "../interfaces/question";

export class Question implements IQuestion {
	readonly statement: string;
	readonly choices: string[];
	readonly correctChoice: IQuestion["correctChoice"];
	readonly explanation: string;

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
