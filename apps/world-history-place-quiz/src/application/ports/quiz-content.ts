import type { QuizContent } from "@/domain/models/quiz-content";
import type { ContentId } from "@/domain/value-objects/content-id";

export interface IQuizContentRepository {
	find(id: ContentId): Promise<QuizContent>;
	findAll(): Promise<QuizContent[]>;
}
