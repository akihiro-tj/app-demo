export const mockQuestion = {
	id: "question-1",
	statement: "Test Question",
	choices: [
		{ value: 0, text: "Choice 1" },
		{ value: 1, text: "Choice 2" },
		{ value: 2, text: "Choice 3" },
	],
	correctChoice: { value: 0, text: "Choice 1" },
	explanation: "Test Explanation",
};

export const mockInvalidQuestionWithEmptyId = {
	...mockQuestion,
	id: "",
};

export const mockInvalidQuestionWithEmptyStatement = {
	...mockQuestion,
	statement: "",
};

export const mockInvalidQuestionWithEmptyChoices = {
	...mockQuestion,
	choices: [],
};

export const mockInvalidQuestionWithOutOfRangeCorrectChoice = {
	...mockQuestion,
	correctChoice: { value: 3, text: "Choice 4" },
};

export const mockInvalidQuestionWithEmptyExplanation = {
	...mockQuestion,
	explanation: "",
};
