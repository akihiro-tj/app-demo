import type { IQuestion } from "@/domain/entities/question";
import type { OGType } from "../constants/meta";

export interface ContentService {
	getContent(contentId: string): AppContent;
	getAllContents(): AppContent[];
	getContentsEntries(): { slug: string }[];
}

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
	choices: Choice[];
	selectedChoice: number | null;
	isCorrect: boolean | null;
}

export interface Choice {
	text: string;
	isCorrect: boolean | null;
}

export interface Meta {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}
