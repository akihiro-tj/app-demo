export interface RawQuestion {
	statement: string;
	choices: string[];
	correctChoice: number;
	explanation: string;
}

export interface IQuestion {
	statement: string;
	choices: string[];
	correctChoice: CorrectChoice;
	explanation: string;
}

interface CorrectChoice {
	value: number;
	text: string;
}
