import type { FileLoader } from "@app-demo/file-loader";
import { Content } from "@/entities/content";
import { type RawMeta, rawMetaSchema } from "@/schemas/meta";
import { rawQuestionSchema, type RawQuestion } from "@/schemas/question";
import { parseRawData } from "@/utils/parse-raw-data";

const CONTENTS_DIR_PATH = "contents";

export interface IContentRepository {
	get(contentId: string): Content;
	getAll(): Content[];
}

export class ContentRepository implements IContentRepository {
	readonly fileLoader: FileLoader;

	constructor(fileLoader: FileLoader) {
		this.fileLoader = fileLoader;
	}

	get(contentId: string): Content {
		const metaFilePath = `${CONTENTS_DIR_PATH}/${contentId}/meta.yaml`;
		const questionsFilePath = `${CONTENTS_DIR_PATH}/${contentId}/questions.yaml`;

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
		const contentIds = this.fileLoader.getFileNames(CONTENTS_DIR_PATH);
		const contents = contentIds.map((contentId) => this.get(contentId));
		return contents;
	}
}
