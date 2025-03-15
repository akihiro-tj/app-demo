import type { ChoiceProps } from "@/components/choice/choice.svelte";
import type { Question } from "@/routes/types/question";
import type { QuestionResult } from "@/routes/types/question-result";

const isCorrectChoice = (
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

export const getQuestionResult = (
	question: Question,
	choiceIndex: number | null,
): QuestionResult => {
	return {
		choices: question.choices.map((choice, i) => ({
			text: choice,
			isCorrect:
				choiceIndex === null
					? null
					: isCorrectChoice(i, choiceIndex, question.correctChoice.value),
		})),
		selectedChoice: choiceIndex,
		isCorrect:
			choiceIndex === null
				? null
				: choiceIndex === question.correctChoice.value,
	};
};
