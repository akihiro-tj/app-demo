import { FileLoader } from "@app-demo/file-loader";
import type { Content } from "@/entities/content";
import { ContentRepository } from "@/repositories/content";

type Entry = {
	slug: string;
};

const getContentRepository = (): ContentRepository => {
	const fileLoader = new FileLoader();
	const contentRepository = new ContentRepository(fileLoader);
	return contentRepository;
};

const parseResult = <T>(result: unknown): T => {
	return JSON.parse(JSON.stringify(result));
};

export const getContent = (contentId: string): Content => {
	const contentRepository = getContentRepository();
	const content = contentRepository.get(contentId);
	return parseResult<Content>(content);
};

export const getAllContents = (): Content[] => {
	const contentRepository = getContentRepository();
	const contents = contentRepository.getAll();
	return parseResult<Content[]>(contents);
};

export const getContentsEntries = (): Entry[] => {
	const contents = getAllContents();
	return contents.map((content) => ({
		slug: content.slug,
	}));
};
