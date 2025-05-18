import { CONTENT_PATH } from "@/application/constants/content";
import { getAllQuizContents } from "@/application/services/quiz-content";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content";

export async function load() {
	const quizContentRepository = new FileQuizContentRepository(CONTENT_PATH);
	const contents = await getAllQuizContents(quizContentRepository);
	return { contents };
}
