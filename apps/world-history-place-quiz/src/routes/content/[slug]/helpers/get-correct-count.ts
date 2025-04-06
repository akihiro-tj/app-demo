import type { QuestionResult } from "@/application/interfaces/question-result";

export const getCorrectCount = (results: QuestionResult[]): number => {
	return results.filter((result) => result.isCorrect).length;
};
