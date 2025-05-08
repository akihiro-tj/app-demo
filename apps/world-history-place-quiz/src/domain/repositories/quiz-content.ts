import type { QuizContent } from "../models/quiz-content";

export interface IQuizContentRepository {
	find(id: string): Promise<QuizContent>;
	findAll(): Promise<QuizContent[]>;
}
