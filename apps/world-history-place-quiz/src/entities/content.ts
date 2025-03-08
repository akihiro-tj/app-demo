import type { RawMeta } from "./meta";
import { Question, type RawQuestion } from "./question";

export interface IContent {
	slug: string;
	path: string;
	title: string;
	questions: Question[];
}

export class Content implements IContent {
	readonly slug: string;
	readonly path: string;
	readonly title: string;
	readonly questions: Question[];

	constructor(
		contentId: string,
		rawMeta: RawMeta,
		rawQuestions: RawQuestion[],
	) {
		this.slug = contentId;
		this.path = `/content/${contentId}`;
		this.title = rawMeta.title;
		this.questions = rawQuestions.map(
			(rawQuestion) => new Question(rawQuestion),
		);
	}
}
