import type { RawMeta } from "../schemas/meta";
import type { RawQuestion } from "../schemas/question";
import { type IQuestion, Question } from "./question";

export interface IContent {
	id: string;
	title: string;
	questions: IQuestion[];
}

export class Content implements IContent {
	readonly id: string;
	readonly title: string;
	readonly questions: Question[];

	constructor(
		contentId: string,
		rawMeta: RawMeta,
		rawQuestions: RawQuestion[],
	) {
		this.id = contentId;
		this.title = rawMeta.title;
		this.questions = rawQuestions.map(
			(rawQuestion) => new Question(rawQuestion),
		);
	}
}
