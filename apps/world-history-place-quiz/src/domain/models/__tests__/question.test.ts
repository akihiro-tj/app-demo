import { describe, expect, it } from "vitest";
import {
	invalidQuestionWithEmptyChoices,
	invalidQuestionWithEmptyExplanation,
	invalidQuestionWithEmptyId,
	invalidQuestionWithEmptyStatement,
	invalidQuestionWithOutOfRangeCorrectChoice,
	validQuestion,
} from "../__fixtures__/question";
import { Question } from "../question";

describe("Question", () => {
	describe("create", () => {
		it("should create a valid question", () => {
			const question = Question.create(validQuestion);

			expect(question.getId()).toBe(validQuestion.id);
			expect(question.getStatement()).toBe(validQuestion.statement);
			expect(question.getChoices()).toHaveLength(validQuestion.choices.length);
			expect(question.getCorrectChoice().getValue()).toBe(
				validQuestion.correctChoice.value,
			);
			expect(question.getExplanation()).toBe(validQuestion.explanation);
		});

		it("should throw error when id is empty", () => {
			expect(() => Question.create(invalidQuestionWithEmptyId)).toThrow(
				"Question id must not be empty",
			);
		});

		it("should throw error when statement is empty", () => {
			expect(() => Question.create(invalidQuestionWithEmptyStatement)).toThrow(
				"Question statement must not be empty",
			);
		});

		it("should throw error when choices are empty", () => {
			expect(() => Question.create(invalidQuestionWithEmptyChoices)).toThrow(
				"Question must have at least one choice",
			);
		});

		it("should throw error when correct choice value is out of range", () => {
			expect(() =>
				Question.create(invalidQuestionWithOutOfRangeCorrectChoice),
			).toThrow("Correct choice value must be within choices range");
		});

		it("should throw error when explanation is empty", () => {
			expect(() =>
				Question.create(invalidQuestionWithEmptyExplanation),
			).toThrow("Question explanation must not be empty");
		});
	});
});
