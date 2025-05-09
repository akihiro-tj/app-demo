import {
	type GeoFeature,
	GeoFeatureCategory,
} from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import { vi } from "vitest";

export const createMockGeoFeatures = (): GeoFeature[] => {
	return [
		{
			id: "test-geo-feature",
			category: GeoFeatureCategory.MOUNTAIN,
			getId: vi.fn().mockReturnValue("test-geo-feature"),
			getCategory: vi.fn().mockReturnValue(GeoFeatureCategory.MOUNTAIN),
		} as unknown as GeoFeature,
	];
};

export const createMockGeoFeatureRepository = (): IGeoFeatureRepository => {
	return {
		findAll: vi.fn(),
	} as unknown as IGeoFeatureRepository;
};
