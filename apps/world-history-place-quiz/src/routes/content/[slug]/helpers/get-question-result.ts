import type { Question } from "@/application/interfaces/question";
import type { QuestionResult } from "@/application/interfaces/question-result";
import type { ChoiceProps } from "@/presentation/components/choice/choice.svelte";

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
