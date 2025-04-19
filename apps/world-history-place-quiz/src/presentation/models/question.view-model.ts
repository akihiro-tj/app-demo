import type { ChoiceViewModel } from "./choice-view-model";

export interface QuestionViewModel {
	id: string;
	statement: string;
	choices: ChoiceViewModel[];
	correctChoice: ChoiceViewModel;
	explanation: string;
	imagePath: string;
}
