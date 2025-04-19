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

		try {
			const [rawMetaInfo, rawQuestions] = [
				this.fsUtils.loadYaml(`${contentPath}/meta.yaml`),
				this.fsUtils.loadYaml(`${contentPath}/questions.yaml`),
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

			const questions = questionsResult.data.map((q, i) =>
				this.createQuestion(
					`${id.getValue()}-${i}`,
					q.statement,
					q.choices,
					q.correctChoice,
					q.explanation,
				),
			);

			return QuizContent.create(
				id.getValue(),
				metaInfoResult.data.title,
				questions,
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
			const rawOrder = this.fsUtils.loadYaml(`${this.dataPath}/order.yaml`);

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
