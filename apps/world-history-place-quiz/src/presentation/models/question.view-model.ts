export interface QuestionViewModel {
	statement: string;
	choices: {
		value: number;
		text: string;
	}[];
	correctChoice: {
		value: number;
		text: string;
	};
	explanation: string;
	imagePath: string;
}
