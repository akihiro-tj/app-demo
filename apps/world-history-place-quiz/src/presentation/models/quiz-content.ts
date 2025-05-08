import type { QuestionViewModel } from "./question";

export interface QuizContentViewModel {
	id: string;
	path: string;
	title: string;
	questions: QuestionViewModel[];
	totalQuestions: number;
}
