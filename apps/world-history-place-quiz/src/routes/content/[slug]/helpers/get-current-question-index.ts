import type { QuestionResult } from "@/application/interfaces/question-result";

export const getCurrentQuestionIndex = (results: QuestionResult[]): number => {
	return results.filter((result) => result.selectedChoice !== null).length;
};
