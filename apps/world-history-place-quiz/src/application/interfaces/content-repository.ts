import type { Content } from "@/domain/entities/content";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentRepository {
	get(args: ContentRepositoryGetArgs): Content;
	getAll(): Content[];
}

export interface ContentRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}

export interface ContentRepositoryGetArgs {
	contentId: string;
}
