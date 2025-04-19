import type { IQuizContentRepository } from "@/application/ports/quiz-content.repository";
import { ValidationError } from "@/domain/errors/validation-error";
import { Choice } from "@/domain/models/choice.model";
import { Question } from "@/domain/models/question.model";
import { QuizContent } from "@/domain/models/quiz-content.model";
import { metaInfoSchema } from "@/domain/schemas/meta-info.schema";
import { orderSchema } from "@/domain/schemas/order.schema";
import { questionSchema } from "@/domain/schemas/question.schema";
import { ContentId } from "@/domain/value-objects/content-id.value-object";
import { FsUtils } from "@app-demo/fs-utils";
import { z } from "zod";

export class FileQuizContentRepository implements IQuizContentRepository {
	private readonly fsUtils: FsUtils;

	constructor(private readonly dataPath: string) {
		this.fsUtils = new FsUtils();
	}

	async find(id: ContentId): Promise<QuizContent> {
		const contentPath = `${this.dataPath}/${id.getValue()}`;

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

		const questionModels = questions.map((q, i) =>
			this.createQuestion(
				`${id.getValue()}-${i}`,
				q.statement,
				q.choices,
				q.correctChoice,
				q.explanation,
			),
		);

		return QuizContent.create(id.getValue(), metaInfo.title, questionModels);
	}

	async findAll(): Promise<QuizContent[]> {
		const orderFilePath = `${this.dataPath}/order.yaml`;
		const rawOrder = this.fsUtils.loadYaml(orderFilePath);
		const order = this.validateSchema(orderSchema, rawOrder, orderFilePath);

		const contents = await Promise.all(
			order.map((id) => this.find(ContentId.create(id))),
		);
		const sortedContents = contents.sort((a, b) => {
			const aIndex = order.indexOf(a.getId().getValue());
			const bIndex = order.indexOf(b.getId().getValue());
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

	private createQuestion(
		id: string,
		statement: string,
		_choices: string[],
		_correctChoice: number,
		explanation: string,
	): Question {
		const choices = _choices.map((choice, index) =>
			Choice.create(`${id}-${index}`, index, choice),
		);

		const correctChoice = choices[_correctChoice];
		if (!correctChoice) {
			throw new Error("Correct choice must be within choices range");
		}

		return Question.create(id, statement, choices, correctChoice, explanation);
	}
}
