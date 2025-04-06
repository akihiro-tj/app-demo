import type {
	ContentRepositoryArgs,
	ContentRepositoryGetArgs,
	IContentRepository,
} from "@/application/interfaces/content-repository";
import { Content } from "@/domain/entities/content";
import type { RawMetaContent } from "@/domain/interfaces/meta-content";
import type { RawQuestion } from "@/domain/interfaces/question";
import { rawMetaContentSchema } from "@/infrastructure/schemas/meta-content";
import { rawQuestionSchema } from "@/infrastructure/schemas/question";
import { parseRawData } from "@/utils/parse-raw-data";

export class ContentRepository implements IContentRepository {
	private fileLoader: ContentRepositoryArgs["fileLoader"];
	private dataPath: ContentRepositoryArgs["dataPath"];

	constructor({ fileLoader, dataPath }: ContentRepositoryArgs) {
		this.fileLoader = fileLoader;
		this.dataPath = dataPath;
	}

	find({ contentId }: ContentRepositoryGetArgs): Content {
		const metaFilePath = `${this.dataPath}${contentId}/meta.yaml`;
		const questionsFilePath = `${this.dataPath}${contentId}/questions.yaml`;

		const rawMetaContent = parseRawData<RawMetaContent>(
			rawMetaContentSchema,
			this.fileLoader.loadYaml(metaFilePath),
		);
		const rawQuestions = parseRawData<RawQuestion[]>(
			rawQuestionSchema.array(),
			this.fileLoader.loadYaml(questionsFilePath),
		);

		return new Content(contentId, rawMetaContent, rawQuestions);
	}

	findAll(): Content[] {
		const contentIds = this.fileLoader.getDirNames(this.dataPath);
		const contents = contentIds.map((contentId) => this.find({ contentId }));
		return contents;
	}
}
