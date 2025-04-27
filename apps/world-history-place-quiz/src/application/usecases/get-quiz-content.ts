import type { IQuizContentRepository } from "@/application/ports/quiz-content";
import { ValidationError } from "@/domain/errors/validation-error";
import type { Choice } from "@/domain/models/choice";
import type { Question } from "@/domain/models/question";
import type { QuizContent } from "@/domain/models/quiz-content";
import { ContentId } from "@/domain/value-objects/content-id";
import type { ChoiceViewModel } from "@/presentation/models/choice";
import type { QuestionViewModel } from "@/presentation/models/question";
import type { QuizContentViewModel } from "@/presentation/models/quiz-content";

export class GetQuizContentUseCase {
	constructor(private readonly quizContentRepository: IQuizContentRepository) {}

	async execute(contentId: string): Promise<QuizContentViewModel> {
		try {
			const content = await this.quizContentRepository.find(
				ContentId.create(contentId),
			);
			return this.mapQuizContentToViewModel(content);
		} catch (error) {
			if (error instanceof ValidationError) {
				throw error;
			}
			throw new Error(
				`Failed to get quiz content '${contentId}': ${error instanceof Error ? error.message : ""}`,
			);
		}
	}

	async executeGetAll(): Promise<QuizContentViewModel[]> {
		try {
			const contents = await this.quizContentRepository.findAll();
			return contents.map((content) => this.mapQuizContentToViewModel(content));
		} catch (error) {
			if (error instanceof ValidationError) {
				throw error;
			}
			throw new Error(
				`Failed to get all quiz contents: ${error instanceof Error ? error.message : ""}`,
			);
		}
	}

	private mapQuizContentToViewModel(
		content: QuizContent,
	): QuizContentViewModel {
		return {
			id: content.getId().getValue(),
			path: `/content/${content.getId().getValue()}`,
			title: content.getTitle(),
			questions: content
				.getQuestions()
				.map((question, index) =>
					this.mapQuestionToViewModel(
						question,
						content.getId().getValue(),
						index,
					),
				),
			totalQuestions: content.getTotalQuestions(),
		};
	}

	private mapQuestionToViewModel(
		question: Question,
		contentId: string,
		questionIndex: number,
	): QuestionViewModel {
		return {
			id: question.getId().getValue(),
			statement: question.getStatement(),
			choices: question
				.getChoices()
				.map((choice) => this.mapChoiceToViewModel(choice)),
			correctChoice: this.mapChoiceToViewModel(question.getCorrectChoice()),
			explanation: question.getExplanation(),
			imagePath: `/content/${contentId}/q${questionIndex + 1}.png`,
		};
	}

	private mapChoiceToViewModel(choice: Choice): ChoiceViewModel {
		return {
			id: choice.getId().getValue(),
			value: choice.getValue(),
			text: choice.getText(),
		};
	}
}
