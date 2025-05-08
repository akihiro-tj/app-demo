import { ValidationError } from "@/domain/errors/validation-error";
import { GeoFeature, GeoFeatureType } from "@/domain/models/geo-feature";
import { FsUtils } from "@app-demo/fs-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	invalidGeoFeature,
	validGeoFeature,
} from "../__fixtures__/geo-feature";
import { FileGeoFeatureRepository } from "../get-feature";

const mockDataPath = "/test/data/path";

vi.mock("@app-demo/fs-utils");

describe("FileGeoFeatureRepository", () => {
	let repository: FileGeoFeatureRepository;
	let mockFsUtils: FsUtils;

	beforeEach(() => {
		mockFsUtils = new FsUtils();
		vi.mocked(FsUtils).mockImplementation(() => mockFsUtils);
		repository = new FileGeoFeatureRepository(mockDataPath);
	});

	describe("findAll", () => {
		it("should return an array of geo features", async () => {
			vi.mocked(mockFsUtils.getDirNames).mockReturnValueOnce(["mountain"]);
			vi.mocked(mockFsUtils.getFileNames).mockReturnValueOnce([
				"test-geo-feature.yaml",
			]);
			vi.mocked(mockFsUtils.loadYaml).mockReturnValueOnce(validGeoFeature);

			const results = await repository.findAll();

			expect(results[0]).toBeInstanceOf(GeoFeature);
			expect(results[0]?.getId()).toBe(validGeoFeature.id);
			expect(results[0]?.getType()).toBe(GeoFeatureType.MOUNTAIN);
		});

		it("should throw ValidationError when invalid geo feature data is provided", async () => {
			vi.mocked(mockFsUtils.getDirNames).mockReturnValueOnce(["mountain"]);
			vi.mocked(mockFsUtils.getFileNames).mockReturnValueOnce([
				"test-geo-feature.yaml",
			]);
			vi.mocked(mockFsUtils.loadYaml).mockReturnValueOnce(invalidGeoFeature);

			await expect(repository.findAll()).rejects.toThrow(ValidationError);
		});
	});
});
