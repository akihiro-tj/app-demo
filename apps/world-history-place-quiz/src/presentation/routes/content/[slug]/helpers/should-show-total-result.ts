import type { AppQuestion } from "@/application/interfaces/content-service";

export const shouldShowTotalResult = (
	questions: AppQuestion[],
	currentQuestionIndex: number,
): boolean => {
	return currentQuestionIndex === questions.length;
};
