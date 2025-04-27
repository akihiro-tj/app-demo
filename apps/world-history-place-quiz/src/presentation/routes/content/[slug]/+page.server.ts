import { CONTENT_PATH } from "@/application/constants/content.js";
import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content.js";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.js";
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
