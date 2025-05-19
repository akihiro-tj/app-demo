import { describe, expect, it } from "vitest";
import {
	invalidChoiceWithEmptyId,
	invalidChoiceWithEmptyText,
	validChoice,
} from "../__fixtures__/choice";
import { Choice } from "../choice";

describe("Choice", () => {
	describe("create", () => {
		it("should create a valid choice", () => {
			const choice = Choice.create(validChoice);
			expect(choice.getId()).toEqual(validChoice.id);
			expect(choice.getText()).toEqual(validChoice.text);
		});

		it("should throw error when id is empty", () => {
			expect(() => Choice.create(invalidChoiceWithEmptyId)).toThrow(
				"Choice id must not be empty",
			);
		});

		it("should throw error when text is empty", () => {
			expect(() => Choice.create(invalidChoiceWithEmptyText)).toThrow(
				"Choice text must not be empty",
			);
		});
	});
});
