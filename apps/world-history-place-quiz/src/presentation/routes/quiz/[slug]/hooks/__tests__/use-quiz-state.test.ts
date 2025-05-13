import { beforeEach, describe, expect, it } from "vitest";
import { mockQuestions } from "../__fixtures__/question";
import { useQuizState } from "../use-quiz-state.svelte";

describe("useQuizState", () => {
	let quizState: ReturnType<typeof useQuizState>;

	beforeEach(() => {
		quizState = useQuizState(mockQuestions);
	});

	describe("correctCount", () => {
		it("should return the correct count", () => {
			expect(quizState.correctCount).toBe(0);
			quizState.setAnswer("q1", "q1-1"); // correct
			quizState.setAnswer("q2", "q2-1"); // incorrect
			quizState.setAnswer("q3", "q3-2"); // correct
			expect(quizState.correctCount).toBe(2);
		});
	});

	describe("isTotalResultVisible", () => {
		it("should return the correct count", () => {
			expect(quizState.isTotalResultVisible).toBe(false);
			quizState.setAnswer("q1", "q1-1");
			quizState.setAnswer("q2", "q2-1");
			quizState.setAnswer("q3", "q3-2");
			expect(quizState.isTotalResultVisible).toBe(true);
		});
	});

	describe("getQuestionState", () => {
		it("should return the correct question state", () => {
			expect(quizState.getQuestionState(0)).toEqual({
				isVisible: true,
				selectedChoice: undefined,
				isCorrect: undefined,
			});
			expect(quizState.getQuestionState(1)).toEqual({
				isVisible: false,
				selectedChoice: undefined,
				isCorrect: undefined,
			});
			quizState.setAnswer("q1", "q1-1"); // correct
			expect(quizState.getQuestionState(0)).toEqual({
				isVisible: true,
				selectedChoice: "q1-1",
				isCorrect: true,
			});
			expect(quizState.getQuestionState(1)).toEqual({
				isVisible: true,
				selectedChoice: undefined,
				isCorrect: undefined,
			});
		});
	});
});
