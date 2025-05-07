import { ValidationError } from "@/domain/errors/validation-error";
import { QuizContent } from "@/domain/models/quiz-content";
import { FsUtils } from "@app-demo/fs-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	mockInvalidMetaInfo,
	mockInvalidOrder,
	mockMetaInfo,
	mockOrder,
	mockQuestions,
} from "../__fixtures__/quiz-content";
import { FileQuizContentRepository } from "../quiz-content";

const mockDataPath = "/test/data/path";

vi.mock("@app-demo/fs-utils");

describe("FileQuizContentRepository", () => {
	let repository: FileQuizContentRepository;
	let mockFsUtils: FsUtils;

	beforeEach(() => {
		mockFsUtils = new FsUtils();
		vi.mocked(FsUtils).mockImplementation(() => mockFsUtils);
		repository = new FileQuizContentRepository(mockDataPath);
	});

	describe("find", () => {
		it("should return QuizContent when valid data is provided", async () => {
			const contentId = "test-content";

			vi.mocked(mockFsUtils.loadYaml)
				.mockReturnValueOnce(mockMetaInfo)
				.mockReturnValueOnce(mockQuestions);

			const result = await repository.find(contentId);

			expect(result).toBeInstanceOf(QuizContent);
			expect(result.getId()).toBe(contentId);
			expect(mockFsUtils.loadYaml).toHaveBeenCalledWith(
				`${mockDataPath}/${contentId}/meta.yaml`,
			);
			expect(mockFsUtils.loadYaml).toHaveBeenCalledWith(
				`${mockDataPath}/${contentId}/questions.yaml`,
			);
		});

		it("should throw ValidationError when invalid data is provided", async () => {
			const contentId = "test-content";

			vi.mocked(mockFsUtils.loadYaml).mockReturnValueOnce(mockInvalidMetaInfo);

			await expect(repository.find(contentId)).rejects.toThrow(ValidationError);
		});
	});

	describe("findAll", () => {
		it("should return sorted QuizContents when valid data is provided", async () => {
			vi.mocked(mockFsUtils.loadYaml)
				.mockReturnValueOnce(mockOrder)
				.mockReturnValueOnce(mockMetaInfo)
				.mockReturnValueOnce(mockQuestions)
				.mockReturnValueOnce(mockMetaInfo)
				.mockReturnValueOnce(mockQuestions);

			const results = await repository.findAll();

			expect(results).toHaveLength(2);
			expect(results[0]?.getId()).toBe(mockOrder[0]);
			expect(results[1]?.getId()).toBe(mockOrder[1]);
			expect(mockFsUtils.loadYaml).toHaveBeenCalledWith(
				`${mockDataPath}/order.yaml`,
			);
		});

		it("should throw ValidationError when invalid order data is provided", async () => {
			vi.mocked(mockFsUtils.loadYaml).mockReturnValueOnce(mockInvalidOrder);

			await expect(repository.findAll()).rejects.toThrow(ValidationError);
		});
	});
});
