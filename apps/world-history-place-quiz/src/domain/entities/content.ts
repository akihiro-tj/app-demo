import type { IContent } from "../interfaces/content";
import type { RawMetaContent } from "../interfaces/meta-content";
import type { RawQuestion } from "../interfaces/question";
import { Question } from "./question";

export class Content implements IContent {
	readonly id: string;
	readonly title: string;
	readonly questions: Question[];

	constructor(
		contentId: string,
		rawMetaContent: RawMetaContent,
		rawQuestions: RawQuestion[],
	) {
		this.id = contentId;
		this.title = rawMetaContent.title;
		this.questions = rawQuestions.map(
			(rawQuestion) => new Question(rawQuestion),
		);
	}
}
