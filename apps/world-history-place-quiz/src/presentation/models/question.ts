import type { ChoiceViewModel } from "./choice";

export interface QuestionViewModel {
	id: string;
	statement: string;
	choices: ChoiceViewModel[];
	correctChoice: ChoiceViewModel;
	explanation: string;
	imagePath: string;
}
