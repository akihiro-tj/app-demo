import { base } from "$app/paths";
import type { ChoiceViewModel } from "@/presentation/models/choice";
import type { QuestionViewModel } from "@/presentation/models/question";
import type { QuizContentViewModel } from "@/presentation/models/quiz-content";
import {
	type Choice,
	type IQuizContentRepository,
	type Question,
	type QuizContent,
	ValidationError,
} from "@world-history-map/content-manager/domain";

export async function getQuizContent(
	quizContentRepository: IQuizContentRepository,
	contentId: string,
): Promise<QuizContentViewModel> {
	try {
		const content = await quizContentRepository.find(contentId);
		return mapQuizContentToViewModel(content);
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new Error(
			`Failed to get quiz content '${contentId}': ${error instanceof Error ? error.message : ""}`,
		);
	}
}

export async function getAllQuizContents(
	quizContentRepository: IQuizContentRepository,
): Promise<QuizContentViewModel[]> {
	try {
		const contents = await quizContentRepository.findAll();
		return contents.map((content) => mapQuizContentToViewModel(content));
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new Error(
			`Failed to get all quiz contents: ${error instanceof Error ? error.message : ""}`,
		);
	}
}

function mapQuizContentToViewModel(content: QuizContent): QuizContentViewModel {
	return {
		id: content.getId(),
		path: `/${content.getId()}`,
		title: content.getTitle(),
		questions: content
			.getQuestions()
			.map((question, index) =>
				mapQuestionToViewModel(question, content.getId(), index),
			),
		totalQuestions: content.getTotalQuestions(),
	};
}

function mapQuestionToViewModel(
	question: Question,
	contentId: string,
	questionIndex: number,
): QuestionViewModel {
	return {
		id: question.getId(),
		statement: question.getStatement(),
		choices: question
			.getChoices()
			.map((choice) => mapChoiceToViewModel(choice)),
		correctChoice: mapChoiceToViewModel(question.getCorrectChoice()),
		explanation: question.getExplanation(),
		imagePath: `${base}/${contentId}/q${questionIndex + 1}.png`,
	};
}

function mapChoiceToViewModel(choice: Choice): ChoiceViewModel {
	return {
		id: choice.getId(),
		text: choice.getText(),
	};
}
