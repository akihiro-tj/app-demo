import type { IContent } from "@/domain/entities/content";
import type { IQuestion } from "@/domain/entities/question";
import { ContentRepository } from "@/infrastructure/repositories/content";
import { ContentsOrderRepository } from "@/infrastructure/repositories/contents-order";
import { FileLoader } from "@app-demo/file-loader";
import type { IContentRepository } from "../interfaces/content-repository";
import type { AppContent, AppQuestion } from "../interfaces/content-service";
import type { IContentsOrderRepository } from "../interfaces/contents-order-repository";

const CONTENTS_PATH = "./contents/";

type Entry = {
	slug: string;
};

const getContentRepository = (): IContentRepository => {
	const fileLoader = new FileLoader();
	const contentRepository = new ContentRepository({
		fileLoader,
		dataPath: CONTENTS_PATH,
	});
	return contentRepository;
};

const getContentsOrderRepository = (): IContentsOrderRepository => {
	const fileLoader = new FileLoader();
	const contentsOrderRepository = new ContentsOrderRepository({
		fileLoader,
		dataPath: CONTENTS_PATH,
	});
	return contentsOrderRepository;
};

const mapContent = (content: IContent): AppContent => {
	const path = `/content/${content.id}`;
	const mappedQuestions: AppQuestion[] = content.questions.map(
		(question: IQuestion, index: number): AppQuestion => ({
			statement: question.statement,
			image: `${path}/q${index + 1}.png`,
			choices: question.choices,
			correctChoice: question.correctChoice,
			explanation: question.explanation,
		}),
	);
	return {
		id: content.id,
		path,
		title: content.title,
		questions: mappedQuestions,
	};
};

const sortContents = (contents: AppContent[]): AppContent[] => {
	const contentsOrderRepository = getContentsOrderRepository();
	const contentsOrder = contentsOrderRepository.find();
	const sortedContents = contents.sort((a, b) => {
		const aIndex = contentsOrder.contentIds.indexOf(a.id);
		const bIndex = contentsOrder.contentIds.indexOf(b.id);
		if (aIndex === -1 && bIndex === -1) return 0;
		if (aIndex === -1) return 1;
		if (bIndex === -1) return -1;
		return aIndex - bIndex;
	});
	return sortedContents;
};

export const getContent = (contentId: string): AppContent => {
	const contentRepository = getContentRepository();
	const content = contentRepository.find({ contentId });
	const mappedContent = mapContent(content);
	return mappedContent;
};

export const getAllContents = (): AppContent[] => {
	const contentRepository = getContentRepository();
	const contents = contentRepository.findAll();
	const mappedContents = contents.map(mapContent);
	const sortedContents = sortContents(mappedContents);
	return sortedContents;
};

export const getContentsEntries = (): Entry[] => {
	const contents = getAllContents();
	return contents.map((content) => ({
		slug: content.id,
	}));
};
