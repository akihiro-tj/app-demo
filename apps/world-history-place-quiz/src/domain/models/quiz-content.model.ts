import { ContentId } from "../value-objects/content-id.value-object";
import type { Question } from "./question.model";

export class QuizContent {
	private readonly id: ContentId;
	private readonly title: string;
	private readonly questions: Question[];

	private constructor(id: ContentId, title: string, questions: Question[]) {
		if (!title) {
			throw new Error("Title must not be empty");
		}
		if (questions.length === 0) {
			throw new Error("Questions must not be empty");
		}

		this.id = id;
		this.title = title;
		this.questions = questions;
	}

	static create(id: string, title: string, questions: Question[]): QuizContent {
		return new QuizContent(ContentId.create(id), title, questions);
	}

	getId(): ContentId {
		return this.id;
	}

	getTitle(): string {
		return this.title;
	}

	getQuestions(): Question[] {
		return [...this.questions];
	}

	getTotalQuestions(): number {
		return this.questions.length;
	}
}
