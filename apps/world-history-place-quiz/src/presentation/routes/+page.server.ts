import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content.usecase";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.repository";
import { FileLoader } from "@app-demo/file-loader";

export async function load() {
	const fileLoader = new FileLoader();
	const quizContentRepository = new FileQuizContentRepository(
		fileLoader,
		"./contents",
	);
	const getQuizContentUseCase = new GetQuizContentUseCase(
		quizContentRepository,
	);
	const contents = await getQuizContentUseCase.executeGetAll();

	return { contents };
}
