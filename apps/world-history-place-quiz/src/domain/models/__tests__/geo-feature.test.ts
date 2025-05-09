import { describe, expect, it } from "vitest";
import {
	invalidGeoFeatureWithEmptyId,
	invalidGeoFeatureWithInvalidCategory,
	validGeoFeature,
} from "../__fixtures__/geo-feature";
import { GeoFeature } from "../geo-feature";

describe("GeoFeature", () => {
	describe("create", () => {
		it("should create a valid geo feature", () => {
			const geoFeature = GeoFeature.create(validGeoFeature);
			expect(geoFeature.getId()).toBe(validGeoFeature.id);
			expect(geoFeature.getCategory()).toBe(validGeoFeature.category);
		});

		it("should throw error when id is empty", () => {
			expect(() => GeoFeature.create(invalidGeoFeatureWithEmptyId)).toThrow(
				"GeoFeature id must not be empty",
			);
		});

		it("should throw error when category is invalid", () => {
			expect(() =>
				GeoFeature.create(invalidGeoFeatureWithInvalidCategory),
			).toThrow("Invalid GeoFeature category");
		});
	});
});
