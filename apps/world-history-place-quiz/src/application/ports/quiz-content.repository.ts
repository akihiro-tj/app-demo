import type { QuizContent } from "@/domain/models/quiz-content.model";
import type { ContentId } from "@/domain/value-objects/content-id.value-object";

export interface IQuizContentRepository {
	find(id: ContentId): Promise<QuizContent>;
	findAll(): Promise<QuizContent[]>;
}
