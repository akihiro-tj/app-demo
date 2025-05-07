import { describe, expect, it } from "vitest";
import {
	mockInvalidQuizContentWithEmptyId,
	mockInvalidQuizContentWithEmptyQuestions,
	mockInvalidQuizContentWithEmptyTitle,
	mockQuizContent,
} from "../__fixtures__/quiz-content";
import { QuizContent } from "../quiz-content";

describe("QuizContent", () => {
	describe("create", () => {
		it("should create a valid quiz content", () => {
			const { id, title, questions } = mockQuizContent;
			const quizContent = QuizContent.create(id, title, questions);

			expect(quizContent.getId()).toBe(id);
			expect(quizContent.getTitle()).toBe(title);
			expect(quizContent.getQuestions()).toHaveLength(questions.length);
			expect(quizContent.getTotalQuestions()).toBe(questions.length);
		});

		it("should throw error when id is empty", () => {
			const { id, title, questions } = mockInvalidQuizContentWithEmptyId;
			expect(() => QuizContent.create(id, title, questions)).toThrow(
				"Quiz content id must not be empty",
			);
		});

		it("should throw error when title is empty", () => {
			const { id, title, questions } = mockInvalidQuizContentWithEmptyTitle;
			expect(() => QuizContent.create(id, title, questions)).toThrow(
				"Quiz content title must not be empty",
			);
		});

		it("should throw error when questions are empty", () => {
			const { id, title, questions } = mockInvalidQuizContentWithEmptyQuestions;
			expect(() => QuizContent.create(id, title, questions)).toThrow(
				"Quiz content must have at least one question",
			);
		});
	});
});
