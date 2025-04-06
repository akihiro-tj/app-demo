import type { IContent } from "../interfaces/content";
import type { RawMeta } from "../interfaces/meta";
import type { RawQuestion } from "../interfaces/question";
import { Question } from "./question";

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
