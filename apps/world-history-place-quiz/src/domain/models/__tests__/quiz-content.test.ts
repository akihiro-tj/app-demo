import { describe, expect, it } from "vitest";
import {
	invalidQuizContentWithEmptyId,
	invalidQuizContentWithEmptyQuestions,
	invalidQuizContentWithEmptyTitle,
	validQuizContent,
} from "../__fixtures__/quiz-content";
import { QuizContent } from "../quiz-content";

describe("QuizContent", () => {
	describe("create", () => {
		it("should create a valid quiz content", () => {
			const quizContent = QuizContent.create(validQuizContent);

			expect(quizContent.getId()).toBe(validQuizContent.id);
			expect(quizContent.getTitle()).toBe(validQuizContent.title);
			expect(quizContent.getQuestions()).toHaveLength(
				validQuizContent.questions.length,
			);
			expect(quizContent.getTotalQuestions()).toBe(
				validQuizContent.questions.length,
			);
		});

		it("should throw error when id is empty", () => {
			expect(() => QuizContent.create(invalidQuizContentWithEmptyId)).toThrow(
				"Quiz content id must not be empty",
			);
		});

		it("should throw error when title is empty", () => {
			expect(() =>
				QuizContent.create(invalidQuizContentWithEmptyTitle),
			).toThrow("Quiz content title must not be empty");
		});

		it("should throw error when questions are empty", () => {
			expect(() =>
				QuizContent.create(invalidQuizContentWithEmptyQuestions),
			).toThrow("Quiz content must have at least one question");
		});
	});
});
