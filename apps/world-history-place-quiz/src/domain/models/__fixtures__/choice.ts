import type { ChoiceProps } from "../choice";

export const validChoice: ChoiceProps = {
	id: "choice-1",
	text: "Test Choice",
};

export const invalidChoiceWithEmptyId: ChoiceProps = {
	...validChoice,
	id: "",
};

export const invalidChoiceWithEmptyText: ChoiceProps = {
	...validChoice,
	text: "",
};
