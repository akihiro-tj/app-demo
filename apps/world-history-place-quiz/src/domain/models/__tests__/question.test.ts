import { describe, expect, it } from "vitest";
import {
	mockInvalidQuestionWithEmptyChoices,
	mockInvalidQuestionWithEmptyExplanation,
	mockInvalidQuestionWithEmptyId,
	mockInvalidQuestionWithEmptyStatement,
	mockInvalidQuestionWithOutOfRangeCorrectChoice,
	mockQuestion,
} from "../__fixtures__/question";
import { Question } from "../question";

describe("Question", () => {
	describe("create", () => {
		it("should create a valid question", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockQuestion;
			const question = Question.create(
				id,
				statement,
				choices,
				correctChoice,
				explanation,
			);

			expect(question.getId()).toBe(id);
			expect(question.getStatement()).toBe(statement);
			expect(question.getChoices()).toHaveLength(choices.length);
			expect(question.getCorrectChoice().getValue()).toBe(correctChoice.value);
			expect(question.getExplanation()).toBe(explanation);
		});

		it("should throw error when id is empty", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockInvalidQuestionWithEmptyId;
			expect(() =>
				Question.create(id, statement, choices, correctChoice, explanation),
			).toThrow("Question id must not be empty");
		});

		it("should throw error when statement is empty", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockInvalidQuestionWithEmptyStatement;
			expect(() =>
				Question.create(id, statement, choices, correctChoice, explanation),
			).toThrow("Question statement must not be empty");
		});

		it("should throw error when choices are empty", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockInvalidQuestionWithEmptyChoices;
			expect(() =>
				Question.create(id, statement, choices, correctChoice, explanation),
			).toThrow("Question must have at least one choice");
		});

		it("should throw error when correct choice value is out of range", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockInvalidQuestionWithOutOfRangeCorrectChoice;
			expect(() =>
				Question.create(id, statement, choices, correctChoice, explanation),
			).toThrow("Correct choice value must be within choices range");
		});

		it("should throw error when explanation is empty", () => {
			const { id, statement, choices, correctChoice, explanation } =
				mockInvalidQuestionWithEmptyExplanation;
			expect(() =>
				Question.create(id, statement, choices, correctChoice, explanation),
			).toThrow("Question explanation must not be empty");
		});
	});
});
