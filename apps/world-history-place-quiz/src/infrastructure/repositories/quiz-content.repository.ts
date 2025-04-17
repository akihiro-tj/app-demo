import type { IQuizContentRepository } from "@/application/ports/quiz-content.repository";
import { ValidationError } from "@/domain/errors/validation-error";
import { Question } from "@/domain/models/question.model";
import { QuizContent } from "@/domain/models/quiz-content.model";
import { metaInfoSchema } from "@/domain/schemas/meta-info.schema";
import { orderSchema } from "@/domain/schemas/order.schema";
import { questionSchema } from "@/domain/schemas/question.schema";
import { ContentId } from "@/domain/value-objects/content-id.value-object";
import type { FileLoader } from "@app-demo/file-loader";
import { z } from "zod";

export class FileQuizContentRepository implements IQuizContentRepository {
	constructor(
		private readonly fileLoader: FileLoader,
		private readonly dataPath: string,
	) {}

	async find(id: ContentId): Promise<QuizContent> {
		const contentPath = `${this.dataPath}/${id.getValue()}`;

		try {
			const [rawMetaInfo, rawQuestions] = [
				this.fileLoader.loadYaml(`${contentPath}/meta.yaml`),
				this.fileLoader.loadYaml(`${contentPath}/questions.yaml`),
			];

			const metaInfoResult = metaInfoSchema.safeParse(rawMetaInfo);
			if (!metaInfoResult.success) {
				throw new ValidationError("Invalid meta data", [metaInfoResult.error]);
			}

			const questionsResult = z.array(questionSchema).safeParse(rawQuestions);
			if (!questionsResult.success) {
				throw new ValidationError("Invalid questions data", [
					questionsResult.error,
				]);
			}

			return QuizContent.create(
				id.getValue(),
				metaInfoResult.data.title,
				questionsResult.data.map((q, i) =>
					Question.create(
						`${id.getValue()}-${i}`,
						q.statement,
						q.choices,
						q.correctChoice,
						q.explanation,
					),
				),
			);
		} catch (error) {
			if (error instanceof ValidationError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new Error(`Failed to load quiz content: ${error.message}`);
			}
			throw new Error("Failed to load quiz content");
		}
	}

	async findAll(): Promise<QuizContent[]> {
		try {
			const rawOrder = this.fileLoader.loadYaml(`${this.dataPath}/order.yaml`);

			const orderResult = orderSchema.safeParse(rawOrder);
			if (!orderResult.success) {
				throw new ValidationError("Invalid content order", [orderResult.error]);
			}

			const contents = await Promise.all(
				orderResult.data.map((id) => this.find(ContentId.create(id))),
			);

			const sortedContents = contents.sort((a, b) => {
				const aIndex = orderResult.data.indexOf(a.getId().getValue());
				const bIndex = orderResult.data.indexOf(b.getId().getValue());
				if (aIndex === -1) return 1;
				if (bIndex === -1) return -1;
				return aIndex - bIndex;
			});

			return sortedContents;
		} catch (error) {
			if (error instanceof ValidationError) {
				throw error;
			}
			if (error instanceof Error) {
				throw new Error(`Failed to load all quiz contents: ${error.message}`);
			}
			throw new Error("Failed to load all quiz contents");
		}
	}
}
