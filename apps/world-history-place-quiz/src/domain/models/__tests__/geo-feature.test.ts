import { describe, expect, it } from "vitest";
import {
	invalidGeoFeatureWithEmptyId,
	invalidGeoFeatureWithInvalidType,
	validGeoFeature,
} from "../__fixtures__/geo-feature";
import { GeoFeature } from "../geo-feature";

describe("GeoFeature", () => {
	describe("create", () => {
		it("should create a valid geo feature", () => {
			const geoFeature = GeoFeature.create(validGeoFeature);
			expect(geoFeature.getId()).toBe(validGeoFeature.id);
			expect(geoFeature.getType()).toBe(validGeoFeature.type);
		});

		it("should throw error when id is empty", () => {
			expect(() => GeoFeature.create(invalidGeoFeatureWithEmptyId)).toThrow(
				"GeoFeature id must not be empty",
			);
		});

		it("should throw error when type is invalid", () => {
			expect(() => GeoFeature.create(invalidGeoFeatureWithInvalidType)).toThrow(
				"Invalid GeoFeature type",
			);
		});
	});
});
