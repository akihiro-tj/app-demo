import type { QuestionResult } from "@/routes/types/question-result";

export const getCurrentQuestionIndex = (results: QuestionResult[]): number => {
	return results.filter((result) => result.selectedChoice !== null).length;
};
