import type { QuestionViewModel } from "./question.view-model";

export interface QuizContentViewModel {
	id: string;
	path: string;
	title: string;
	questions: QuestionViewModel[];
	totalQuestions: number;
}
