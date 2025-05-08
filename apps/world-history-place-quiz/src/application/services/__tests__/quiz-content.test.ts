import { ValidationError } from "@/domain/errors/validation-error";
import type { Choice } from "@/domain/models/choice";
import type { Question } from "@/domain/models/question";
import type { QuizContent } from "@/domain/models/quiz-content";
import type { IQuizContentRepository } from "@/domain/repositories/quiz-content";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createMockChoice,
	createMockQuestion,
	createMockQuizContent,
	createMockQuizContentRepository,
} from "../__fixtures__/quiz-content";
import { getAllQuizContents, getQuizContent } from "../quiz-content";

describe("QuizContent Service", () => {
	let mockQuizContentRepository: IQuizContentRepository;
	let mockQuizContent: QuizContent;
	let mockQuestion: Question;
	let mockChoice: Choice;

	beforeEach(() => {
		mockChoice = createMockChoice();
		mockQuestion = createMockQuestion(mockChoice);
		mockQuizContent = createMockQuizContent(mockQuestion);
		mockQuizContentRepository = createMockQuizContentRepository();
	});

	describe("getQuizContent", () => {
		it("should return quiz content view model when content is found", async () => {
			vi.mocked(mockQuizContentRepository.find).mockResolvedValue(
				mockQuizContent,
			);

			const result = await getQuizContent(
				mockQuizContentRepository,
				"content-1",
			);

			expect(result).toEqual({
				id: "content-1",
				path: "/quiz/content-1",
				title: "Test Quiz",
				questions: [
					{
						id: "question-1",
						statement: "Test question?",
						choices: [
							{
								id: "choice-1",
								text: "A",
							},
						],
						correctChoice: {
							id: "choice-1",
							text: "A",
						},
						explanation: "Test explanation",
						imagePath: "/quiz/content-1/q1.png",
					},
				],
				totalQuestions: 1,
			});
		});

		it("should throw ValidationError when repository throws ValidationError", async () => {
			const validationError = new ValidationError("Invalid content ID", []);
			vi.mocked(mockQuizContentRepository.find).mockRejectedValue(
				validationError,
			);

			await expect(
				getQuizContent(mockQuizContentRepository, "invalid-id"),
			).rejects.toThrow(ValidationError);
		});

		it("should throw Error when repository throws other error", async () => {
			const error = new Error("Database error");
			vi.mocked(mockQuizContentRepository.find).mockRejectedValue(error);

			await expect(
				getQuizContent(mockQuizContentRepository, "content-1"),
			).rejects.toThrow(
				"Failed to get quiz content 'content-1': Database error",
			);
		});
	});

	describe("getAllQuizContents", () => {
		it("should return array of quiz content view models", async () => {
			vi.mocked(mockQuizContentRepository.findAll).mockResolvedValue([
				mockQuizContent,
			]);

			const result = await getAllQuizContents(mockQuizContentRepository);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				id: "content-1",
				path: "/quiz/content-1",
				title: "Test Quiz",
				questions: [
					{
						id: "question-1",
						statement: "Test question?",
						choices: [
							{
								id: "choice-1",
								text: "A",
							},
						],
						correctChoice: {
							id: "choice-1",
							text: "A",
						},
						explanation: "Test explanation",
						imagePath: "/quiz/content-1/q1.png",
					},
				],
				totalQuestions: 1,
			});
		});

		it("should throw ValidationError when repository throws ValidationError", async () => {
			const validationError = new ValidationError("Invalid content ID", []);
			vi.mocked(mockQuizContentRepository.findAll).mockRejectedValue(
				validationError,
			);

			await expect(
				getAllQuizContents(mockQuizContentRepository),
			).rejects.toThrow(ValidationError);
		});

		it("should throw Error when repository throws other error", async () => {
			const error = new Error("Database error");
			vi.mocked(mockQuizContentRepository.findAll).mockRejectedValue(error);

			await expect(
				getAllQuizContents(mockQuizContentRepository),
			).rejects.toThrow("Failed to get all quiz contents: Database error");
		});
	});
});
