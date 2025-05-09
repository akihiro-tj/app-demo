import { QUIZ_CONTENT_PATH } from "@/application/constants/content.js";
import {
	getAllQuizContents,
	getQuizContent,
} from "@/application/services/quiz-content.js";
import { FileQuizContentRepository } from "@/infrastructure/repositories/quiz-content.js";
import type { EntryGenerator } from "./$types.js";

const quizContentRepository = new FileQuizContentRepository(QUIZ_CONTENT_PATH);

export async function load({ params }) {
	const content = await getQuizContent(quizContentRepository, params.slug);
	return { content };
}

export const entries: EntryGenerator = async () => {
	const contents = await getAllQuizContents(quizContentRepository);
	return contents.map((content) => ({
		slug: content.id,
	}));
};
