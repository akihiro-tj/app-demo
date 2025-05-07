import type { Choice } from "@/domain/models/choice";
import type { Question } from "@/domain/models/question";
import type { QuizContent } from "@/domain/models/quiz-content";
import type { IQuizContentRepository } from "@/domain/repositories/quiz-content";
import { vi } from "vitest";

export const createMockChoice = (): Choice => {
	return {
		id: "choice-1",
		value: "A",
		text: "Choice 1",
		getId: vi.fn().mockReturnValue("choice-1"),
		getValue: vi.fn().mockReturnValue("A"),
		getText: vi.fn().mockReturnValue("Choice 1"),
	} as unknown as Choice;
};

export const createMockQuestion = (choice: Choice): Question => {
	return {
		id: "question-1",
		statement: "Test question?",
		choices: [choice],
		correctChoice: choice,
		explanation: "Test explanation",
		getId: vi.fn().mockReturnValue("question-1"),
		getStatement: vi.fn().mockReturnValue("Test question?"),
		getChoices: vi.fn().mockReturnValue([choice]),
		getCorrectChoice: vi.fn().mockReturnValue(choice),
		getExplanation: vi.fn().mockReturnValue("Test explanation"),
	} as unknown as Question;
};

export const createMockQuizContent = (question: Question): QuizContent => {
	return {
		id: "content-1",
		title: "Test Quiz",
		questions: [question],
		getId: vi.fn().mockReturnValue("content-1"),
		getTitle: vi.fn().mockReturnValue("Test Quiz"),
		getQuestions: vi.fn().mockReturnValue([question]),
		getTotalQuestions: vi.fn().mockReturnValue(1),
	} as unknown as QuizContent;
};

export const createMockQuizContentRepository = (): IQuizContentRepository => {
	return {
		find: vi.fn(),
		findAll: vi.fn(),
	} as unknown as IQuizContentRepository;
};
