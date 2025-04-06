import type { IContent } from "@/domain/entities/content";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentRepository {
	find(args: ContentRepositoryFindArgs): IContent;
	findAll(): IContent[];
}

export interface ContentRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}

export interface ContentRepositoryFindArgs {
	contentId: string;
}
