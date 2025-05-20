import {
	getAllQuizContents,
	getQuizContent,
} from "@/application/services/quiz-content.js";
import { FileQuizContentRepository } from "@world-history-map/content-manager/infrastructure";
import type { EntryGenerator } from "./$types.js";

const quizContentRepository = new FileQuizContentRepository();

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
