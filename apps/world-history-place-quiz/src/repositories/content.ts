import type { FileLoader } from "@app-demo/file-loader";
import type { RawQuestion } from "@/entities/question";
import type { RawMeta } from "@/entities/meta";
import { Content } from "@/entities/content";

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

		// TODO: Add validation
		const rawMeta = this.fileLoader.loadYaml(metaFilePath) as RawMeta;
		const rawQuestions = this.fileLoader.loadYaml(
			questionsFilePath,
		) as RawQuestion[];

		return new Content(contentId, rawMeta, rawQuestions);
	}

	getAll(): Content[] {
		const contentIds = this.fileLoader.getFileNames(CONTENTS_DIR_PATH);
		const contents = contentIds.map((contentId) => this.get(contentId));
		return contents;
	}
}
