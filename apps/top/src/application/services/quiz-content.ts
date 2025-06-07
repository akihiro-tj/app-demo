import type { QuizContentViewModel } from "@/presentation/models/quiz-content";
import { appConfig } from "@world-history-map/app-config";
import type {
	IQuizContentRepository,
	QuizContent,
} from "@world-history-map/content-manager/domain";

export async function getAllQuizContents(
	quizContentRepository: IQuizContentRepository,
): Promise<QuizContentViewModel[]> {
	try {
		const contents = await quizContentRepository.findAll();
		return contents.map(mapQuizContentToViewModel);
	} catch (error) {
		throw new Error(
			`Failed to get all quiz contents: ${error instanceof Error ? error.message : ""}`,
		);
	}
}

function mapQuizContentToViewModel(content: QuizContent): QuizContentViewModel {
	return {
		id: content.getId(),
		path: `${appConfig.quizBasePath}/${content.getId()}/`,
		title: content.getTitle(),
	};
}
