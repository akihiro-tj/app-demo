import type { RawMetaContent } from "@/schemas/meta-content";
import type { RawQuestion } from "@/schemas/question";
import { Question } from "./question";

export interface IContent {
	id: string;
	title: string;
	questions: Question[];
}

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
