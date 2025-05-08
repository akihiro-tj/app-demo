import { ValidationError } from "@/domain/errors/validation-error";
import { QuizContent } from "@/domain/models/quiz-content";
import type { IQuizContentRepository } from "@/domain/repositories/quiz-content";
import { metaInfoSchema } from "@/domain/schemas/meta-info";
import { orderSchema } from "@/domain/schemas/order";
import { questionSchema } from "@/domain/schemas/question";
import { FsUtils } from "@app-demo/fs-utils";
import { z } from "zod";

export class FileQuizContentRepository implements IQuizContentRepository {
	private readonly fsUtils: FsUtils;

	constructor(private readonly dataPath: string) {
		this.fsUtils = new FsUtils();
	}

	async find(contentId: string): Promise<QuizContent> {
		const contentPath = `${this.dataPath}/${contentId}`;

		const [metaInfoFilePath, questionsFilePath] = [
			`${contentPath}/meta.yaml`,
			`${contentPath}/questions.yaml`,
		];

		const [rawMetaInfo, rawQuestions] = [
			this.fsUtils.loadYaml(metaInfoFilePath),
			this.fsUtils.loadYaml(questionsFilePath),
		];

		const [metaInfo, questions] = [
			this.validateSchema(metaInfoSchema, rawMetaInfo, metaInfoFilePath),
			this.validateSchema(
				z.array(questionSchema),
				rawQuestions,
				questionsFilePath,
			),
		];

		return QuizContent.create({
			id: contentId,
			title: metaInfo.title,
			questions,
		});
	}

	async findAll(): Promise<QuizContent[]> {
		const orderFilePath = `${this.dataPath}/order.yaml`;
		const rawOrder = this.fsUtils.loadYaml(orderFilePath);
		const order = this.validateSchema(orderSchema, rawOrder, orderFilePath);

		const contents = await Promise.all(
			order.map((contentId) => this.find(contentId)),
		);
		const sortedContents = contents.sort((a, b) => {
			const aIndex = order.indexOf(a.getId());
			const bIndex = order.indexOf(b.getId());
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		});

		return sortedContents;
	}

	private validateSchema<T>(
		schema: z.ZodSchema<T>,
		data: unknown,
		filePath: string,
	): T {
		const result = schema.safeParse(data);
		if (!result.success) {
			throw new ValidationError(`Invalid data: '${filePath}'`, [result.error]);
		}
		return result.data;
	}
}
