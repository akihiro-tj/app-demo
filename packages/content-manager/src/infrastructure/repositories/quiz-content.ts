import path from "node:path";
import { FsUtils } from "@world-history-map/fs-utils";
import { z } from "zod";
import { QuizContent } from "../../domain/models/quiz-content";
import type { IQuizContentRepository } from "../../domain/repositories/quiz-content";
import { metaInfoSchema } from "../../domain/schemas/meta-info";
import { orderSchema } from "../../domain/schemas/order";
import { questionSchema } from "../../domain/schemas/question";
import { QUIZ_CONTENTS_DIR_PATH } from "./constants";
import { validateSchema } from "./helpers/validate-schema";

export class FileQuizContentRepository implements IQuizContentRepository {
	private readonly fsUtils: FsUtils;

	constructor() {
		this.fsUtils = new FsUtils();
	}

	async find(contentId: string): Promise<QuizContent> {
		const contentPath = path.join(QUIZ_CONTENTS_DIR_PATH, contentId);

		const [metaInfoFilePath, questionsFilePath] = [
			path.join(contentPath, "meta.yaml"),
			path.join(contentPath, "questions.yaml"),
		];

		const [rawMetaInfo, rawQuestions] = [
			this.fsUtils.loadYaml(metaInfoFilePath),
			this.fsUtils.loadYaml(questionsFilePath),
		];

		const [metaInfo, questions] = [
			validateSchema(metaInfoSchema, rawMetaInfo, metaInfoFilePath),
			validateSchema(z.array(questionSchema), rawQuestions, questionsFilePath),
		];

		return QuizContent.create({
			id: contentId,
			title: metaInfo.title,
			questions,
		});
	}

	async findAll(): Promise<QuizContent[]> {
		const orderFilePath = path.join(QUIZ_CONTENTS_DIR_PATH, "order.yaml");
		const rawOrder = this.fsUtils.loadYaml(orderFilePath);
		const order = validateSchema(orderSchema, rawOrder, orderFilePath);

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
}
