export const mockQuizContent = {
	id: "quiz-1",
	title: "Test Quiz",
	questions: [
		{
			statement: "Question 1",
			choices: ["Choice 1", "Choice 2", "Choice 3"],
			correctChoice: 0,
			explanation: "Explanation 1",
		},
	],
};

export const mockInvalidQuizContentWithEmptyId = {
	...mockQuizContent,
	id: "",
};

export const mockInvalidQuizContentWithEmptyTitle = {
	...mockQuizContent,
	title: "",
};

export const mockInvalidQuizContentWithEmptyQuestions = {
	...mockQuizContent,
	questions: [],
};
