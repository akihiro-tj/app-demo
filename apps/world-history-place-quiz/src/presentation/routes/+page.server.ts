import { CONTENT_PATH } from "@/application/constants/content";
import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content";

export async function load() {
	const quizContentRepository = new FileQuizContentRepository(CONTENT_PATH);
	const getQuizContentUseCase = new GetQuizContentUseCase(
		quizContentRepository,
	);
	const contents = await getQuizContentUseCase.executeGetAll();

	return { contents };
}
