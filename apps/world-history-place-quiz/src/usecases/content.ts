import type { Content } from "@/entities/content";
import type { Question } from "@/entities/question";
import { ContentRepository } from "@/repositories/content";
import { ContentsOrderRepository } from "@/repositories/contents-order";
import type { Content as ContentForService } from "@/routes/types/content";
import type { Question as QuestionForService } from "@/routes/types/question";
import { FileLoader } from "@app-demo/file-loader";

const CONTENTS_PATH = "./contents/";

type Entry = {
	slug: string;
};

const getContentRepository = (): ContentRepository => {
	const fileLoader = new FileLoader();
	const contentRepository = new ContentRepository({
		fileLoader,
		dataPath: CONTENTS_PATH,
	});
	return contentRepository;
};

const getContentsOrderRepository = (): ContentsOrderRepository => {
	const fileLoader = new FileLoader();
	const contentsOrderRepository = new ContentsOrderRepository({
		fileLoader,
		dataPath: CONTENTS_PATH,
	});
	return contentsOrderRepository;
};

const mapContent = (content: Content): ContentForService => {
	const path = `/content/${content.id}`;
	const mappedQuestions: QuestionForService[] = content.questions.map(
		(question: Question, index: number): QuestionForService => ({
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

const sortContents = (contents: ContentForService[]): ContentForService[] => {
	const contentsOrderRepository = getContentsOrderRepository();
	const contentsOrder = contentsOrderRepository.get();
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

export const getContent = (contentId: string): ContentForService => {
	const contentRepository = getContentRepository();
	const content = contentRepository.get({ contentId });
	const mappedContent = mapContent(content);
	return mappedContent;
};

export const getAllContents = (): ContentForService[] => {
	const contentRepository = getContentRepository();
	const contents = contentRepository.getAll();
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
