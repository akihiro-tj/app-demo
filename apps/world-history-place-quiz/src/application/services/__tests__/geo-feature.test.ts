import { ValidationError } from "@/domain/errors/validation-error";
import {
	type GeoFeature,
	GeoFeatureCategory,
} from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createMockGeoFeatureRepository,
	createMockGeoFeatures,
} from "../__fixtures__/geo-feature";
import { getGeoFeatures } from "../geo-feature";

describe("GeoFeature Service", () => {
	let mockGeoFeatureRepository: IGeoFeatureRepository;
	let mockGeoFeatures: GeoFeature[];

	beforeEach(() => {
		mockGeoFeatures = createMockGeoFeatures();
		mockGeoFeatureRepository = createMockGeoFeatureRepository();
	});

	describe("getGeoFeature", () => {
		it("should return the geo feature", async () => {
			vi.mocked(mockGeoFeatureRepository.findAll).mockResolvedValue(
				mockGeoFeatures,
			);

			const result = await getGeoFeatures(mockGeoFeatureRepository);
			expect(result[0]).toEqual({
				id: "test-geo-feature",
				category: GeoFeatureCategory.MOUNTAIN,
			});
		});

		it("should throw ValidationError when repository throws ValidationError", async () => {
			const validationError = new ValidationError("Invalid content ID", []);
			vi.mocked(mockGeoFeatureRepository.findAll).mockRejectedValue(
				validationError,
			);

			await expect(getGeoFeatures(mockGeoFeatureRepository)).rejects.toThrow(
				ValidationError,
			);
		});

		it("should throw Error when repository throws other error", async () => {
			const error = new Error("Database error");
			vi.mocked(mockGeoFeatureRepository.findAll).mockRejectedValue(error);

			await expect(getGeoFeatures(mockGeoFeatureRepository)).rejects.toThrow(
				Error,
			);
		});
	});
});
