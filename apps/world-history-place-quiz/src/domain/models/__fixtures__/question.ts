import type { QuestionProps } from "../question";

export const validQuestion: QuestionProps = {
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

export const invalidQuestionWithEmptyId: QuestionProps = {
	...validQuestion,
	id: "",
};

export const invalidQuestionWithEmptyStatement: QuestionProps = {
	...validQuestion,
	statement: "",
};

export const invalidQuestionWithEmptyChoices: QuestionProps = {
	...validQuestion,
	choices: [],
};

export const invalidQuestionWithOutOfRangeCorrectChoice: QuestionProps = {
	...validQuestion,
	correctChoice: { value: 3, text: "Choice 4" },
};

export const invalidQuestionWithEmptyExplanation: QuestionProps = {
	...validQuestion,
	explanation: "",
};
