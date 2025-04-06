import type { QuestionResult } from "@/application/interfaces/content-service";

export const getCorrectCount = (results: QuestionResult[]): number => {
	return results.filter((result) => result.isCorrect).length;
};
