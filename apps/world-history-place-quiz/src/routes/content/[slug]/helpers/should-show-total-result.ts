import type { Question } from "@/routes/types/question";

export const shouldShowTotalResult = (
	questions: Question[],
	currentQuestionIndex: number,
): boolean => {
	return currentQuestionIndex === questions.length;
};
