import type { QuestionResult } from "@/routes/types/question-result";

export const getCorrectCount = (results: QuestionResult[]): number => {
	return results.filter((result) => result.isCorrect).length;
};
