export const shouldShowQuestionResult = (
	isCorrect: boolean | null,
): isCorrect is boolean => {
	return isCorrect !== null;
};
