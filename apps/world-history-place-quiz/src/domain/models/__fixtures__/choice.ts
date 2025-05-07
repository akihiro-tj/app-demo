export const mockChoice = {
	id: "choice-1",
	value: 0,
	text: "Test Choice",
};

export const mockInvalidChoiceWithEmptyId = {
	...mockChoice,
	id: "",
};

export const mockInvalidChoiceWithNegativeValue = {
	...mockChoice,
	value: -1,
};

export const mockInvalidChoiceWithEmptyText = {
	...mockChoice,
	text: "",
};
