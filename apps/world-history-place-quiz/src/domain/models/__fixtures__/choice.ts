import type { ChoiceProps } from "../choice";

export const validChoice: ChoiceProps = {
	id: "choice-1",
	value: 0,
	text: "Test Choice",
};

export const invalidChoiceWithEmptyId: ChoiceProps = {
	...validChoice,
	id: "",
};

export const invalidChoiceWithNegativeValue: ChoiceProps = {
	...validChoice,
	value: -1,
};

export const invalidChoiceWithEmptyText: ChoiceProps = {
	...validChoice,
	text: "",
};
