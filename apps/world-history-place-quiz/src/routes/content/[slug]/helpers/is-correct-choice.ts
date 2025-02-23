import type { ChoiceProps } from "@/components/choice/choice.svelte";

export const isCorrectChoice = (
	choiceIndex: number,
	selectedChoice: number,
	correctChoice: number,
): ChoiceProps["isCorrect"] => {
	const isSelected = choiceIndex === selectedChoice;
	const isCorrect = choiceIndex === correctChoice;
	if (isSelected || isCorrect) {
		return isCorrect;
	}
	return null;
};
