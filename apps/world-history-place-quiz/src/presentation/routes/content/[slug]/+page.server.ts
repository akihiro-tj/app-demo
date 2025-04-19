import { CONTENT_PATH } from "@/application/constants/content.constant.js";
import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content.usecase";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.repository";
import type { EntryGenerator } from "./$types.js";

const quizContentRepository = new FileQuizContentRepository(CONTENT_PATH);
const getQuizContentUseCase = new GetQuizContentUseCase(quizContentRepository);

export async function load({ params }) {
	const content = await getQuizContentUseCase.execute(params.slug);
	return { content };
}

export const entries: EntryGenerator = async () => {
	const contents = await getQuizContentUseCase.executeGetAll();
	return contents.map((content) => ({
		slug: content.id,
	}));
};
