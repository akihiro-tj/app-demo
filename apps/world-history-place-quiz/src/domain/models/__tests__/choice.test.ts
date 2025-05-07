import { describe, expect, it } from "vitest";
import {
	mockChoice,
	mockInvalidChoiceWithEmptyId,
	mockInvalidChoiceWithEmptyText,
	mockInvalidChoiceWithNegativeValue,
} from "../__fixtures__/choice";
import { Choice } from "../choice";

describe("Choice", () => {
	describe("create", () => {
		it("should create a valid choice", () => {
			const { id, value, text } = mockChoice;
			const choice = Choice.create(id, value, text);
			expect(choice.getId()).toBe(id);
			expect(choice.getValue()).toBe(value);
			expect(choice.getText()).toBe(text);
		});

		it("should throw error when id is empty", () => {
			const { id, value, text } = mockInvalidChoiceWithEmptyId;
			expect(() => Choice.create(id, value, text)).toThrow(
				"Choice id must not be empty",
			);
		});

		it("should throw error when text is empty", () => {
			const { id, value, text } = mockInvalidChoiceWithEmptyText;
			expect(() => Choice.create(id, value, text)).toThrow(
				"Choice text must not be empty",
			);
		});

		it("should throw error when value is negative", () => {
			const { id, value, text } = mockInvalidChoiceWithNegativeValue;
			expect(() => Choice.create(id, value, text)).toThrow(
				"Choice value must be non-negative",
			);
		});
	});
});
