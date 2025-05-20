import { getAllQuizContents } from "@/application/services/quiz-content";
import { FileQuizContentRepository } from "@world-history-map/content-manager/infrastructure";

export const prerender = true;

export async function load() {
	const quizContentRepository = new FileQuizContentRepository();
	const contents = await getAllQuizContents(quizContentRepository);
	return { contents };
}
