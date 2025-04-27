import { Question } from "./question";

interface QuestionData {
	statement: string;
	choices: string[];
	correctChoice: number;
	explanation: string;
}

export class QuizContent {
	private readonly id: string;
	private readonly title: string;
	private readonly questions: Question[];

	private constructor(id: string, title: string, questions: Question[]) {
		if (!id) {
			throw new Error("Id must not be empty");
		}
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

	static create(
		id: string,
		title: string,
		questionData: QuestionData[],
	): QuizContent {
		const questions = questionData.map((question, index) => {
			const choices = question.choices.map((choice, index) => ({
				value: index,
				text: choice,
			}));
			const correctChoice = {
				value: question.correctChoice,
				text: question.choices[question.correctChoice] ?? "",
			};
			return Question.create(
				`${id}-${index}`,
				question.statement,
				choices,
				correctChoice,
				question.explanation,
			);
		});
		return new QuizContent(id, title, questions);
	}

	getId(): string {
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
