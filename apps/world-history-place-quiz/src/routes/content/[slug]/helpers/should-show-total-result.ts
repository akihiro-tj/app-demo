import type { Question } from "@/application/interfaces/question";

export const shouldShowTotalResult = (
	questions: Question[],
	currentQuestionIndex: number,
): boolean => {
	return currentQuestionIndex === questions.length;
};
