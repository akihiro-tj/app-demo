import type { Question } from "./question";

export interface Content {
	id: string;
	path: string;
	title: string;
	questions: Question[];
}
