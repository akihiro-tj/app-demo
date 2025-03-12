import type { QuestionForService } from "./question";

export interface ContentForService {
	id: string;
	path: string;
	title: string;
	questions: QuestionForService[];
}
