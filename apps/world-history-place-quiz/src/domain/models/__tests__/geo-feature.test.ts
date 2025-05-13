import { describe, expect, it } from "vitest";
import {
	invalidGeoFeatureWithInvalidCategory,
	validGeoFeature,
} from "../__fixtures__/geo-feature";
import { GeoFeature } from "../geo-feature";

describe("GeoFeature", () => {
	describe("create", () => {
		it("should create a valid geo feature", () => {
			const geoFeature = GeoFeature.create(validGeoFeature);
			expect(geoFeature.getId()).toBe(validGeoFeature.id);
			expect(geoFeature.getName()).toBe(validGeoFeature.name);
			expect(geoFeature.getCategory()).toBe(validGeoFeature.category);
		});

		it("should throw error when category is invalid", () => {
			expect(() =>
				GeoFeature.create(invalidGeoFeatureWithInvalidCategory),
			).toThrow("Invalid GeoFeature category");
		});
	});
});
