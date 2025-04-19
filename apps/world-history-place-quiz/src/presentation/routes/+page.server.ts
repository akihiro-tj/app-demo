import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content.usecase";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.repository";
import { FsUtils } from "@app-demo/fs-utils";

export async function load() {
	const fsUtils = new FsUtils();
	const quizContentRepository = new FileQuizContentRepository(
		fsUtils,
		"./contents",
	);
	const getQuizContentUseCase = new GetQuizContentUseCase(
		quizContentRepository,
	);
	const contents = await getQuizContentUseCase.executeGetAll();

	return { contents };
}
