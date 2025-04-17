import { GetQuizContentUseCase } from "@/application/usecases/get-quiz-content.usecase";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.repository";
import { FileLoader } from "@app-demo/file-loader";
import type { EntryGenerator } from "./$types.js";

const fileLoader = new FileLoader();
const quizContentRepository = new FileQuizContentRepository(
	fileLoader,
	"./contents",
);
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
