import type { IQuestion } from "./question";

export interface IContent {
	id: string;
	title: string;
	questions: IQuestion[];
}
