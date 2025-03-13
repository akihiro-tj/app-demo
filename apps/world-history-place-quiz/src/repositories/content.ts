import { Content } from "@/entities/content";
import { type RawMeta, rawMetaSchema } from "@/schemas/meta";
import { type RawQuestion, rawQuestionSchema } from "@/schemas/question";
import { parseRawData } from "@/utils/parse-raw-data";
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

export class ContentRepository implements IContentRepository {
	private fileLoader: ContentRepositoryArgs["fileLoader"];
	private dataPath: ContentRepositoryArgs["dataPath"];

	constructor({ fileLoader, dataPath }: ContentRepositoryArgs) {
		this.fileLoader = fileLoader;
		this.dataPath = dataPath;
	}

	get({ contentId }: ContentRepositoryGetArgs): Content {
		const metaFilePath = `${this.dataPath}${contentId}/meta.yaml`;
		const questionsFilePath = `${this.dataPath}${contentId}/questions.yaml`;

		const rawMeta = parseRawData<RawMeta>(
			rawMetaSchema,
			this.fileLoader.loadYaml(metaFilePath),
		);
		const rawQuestions = parseRawData<RawQuestion[]>(
			rawQuestionSchema.array(),
			this.fileLoader.loadYaml(questionsFilePath),
		);

		return new Content(contentId, rawMeta, rawQuestions);
	}

	getAll(): Content[] {
		const contentIds = this.fileLoader.getFileNames(this.dataPath);
		const contents = contentIds.map((contentId) => this.get({ contentId }));
		return contents;
	}
}
