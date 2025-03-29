import type { Content } from "@/entities/content";
import type { Question } from "@/entities/question";
import { ContentRepository } from "@/repositories/content";
import type { Content as ContentForService } from "@/routes/types/content";
import type { Question as QuestionForService } from "@/routes/types/question";
import { FileLoader } from "@app-demo/file-loader";

type Entry = {
	slug: string;
};

const getContentRepository = (): ContentRepository => {
	const fileLoader = new FileLoader();
	const contentRepository = new ContentRepository({
		fileLoader,
		dataPath: "./contents/",
	});
	return contentRepository;
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
	return mappedContents;
};

export const getContentsEntries = (): Entry[] => {
	const contents = getAllContents();
	return contents.map((content) => ({
		slug: content.id,
	}));
};
