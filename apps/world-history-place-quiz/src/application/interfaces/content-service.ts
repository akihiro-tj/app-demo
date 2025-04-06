import type { IQuestion } from "@/domain/entities/question";
import type { ChoiceListProps } from "@/presentation/components/choice-list/choice-list.svelte";
import type { OGType } from "../constants/meta";

export interface AppContent {
	id: string;
	path: string;
	title: string;
	questions: AppQuestion[];
}

export interface AppQuestion {
	statement: string;
	image: string;
	choices: string[];
	correctChoice: IQuestion["correctChoice"];
	explanation: string;
}

export interface QuestionResult {
	choices: ChoiceListProps["choices"];
	selectedChoice: number | null;
	isCorrect: boolean | null;
}

export interface Meta {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}
