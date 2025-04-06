import type { ChoiceListProps } from "@/presentation/components/choice-list/choice-list.svelte";

export interface QuestionResult {
	choices: ChoiceListProps["choices"];
	selectedChoice: number | null;
	isCorrect: boolean | null;
}
