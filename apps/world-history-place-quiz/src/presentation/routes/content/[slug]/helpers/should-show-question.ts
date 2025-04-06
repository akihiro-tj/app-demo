export const shouldShowQuestion = (
	questionIndex: number,
	currentQuestionIndex: number,
): boolean => {
	return questionIndex <= currentQuestionIndex;
};
