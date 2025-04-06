import type { QuestionResult } from "@/application/interfaces/content-service";

export const getCurrentQuestionIndex = (results: QuestionResult[]): number => {
	return results.filter((result) => result.selectedChoice !== null).length;
};
