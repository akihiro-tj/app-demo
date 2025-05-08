import { type GeoFeature, GeoFeatureType } from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import { vi } from "vitest";

export const createMockGeoFeatures = (): GeoFeature[] => {
	return [
		{
			id: "test-geo-feature",
			type: GeoFeatureType.MOUNTAIN,
			getId: vi.fn().mockReturnValue("test-geo-feature"),
			getType: vi.fn().mockReturnValue(GeoFeatureType.MOUNTAIN),
		} as unknown as GeoFeature,
	];
};

export const createMockGeoFeatureRepository = (): IGeoFeatureRepository => {
	return {
		findAll: vi.fn(),
	} as unknown as IGeoFeatureRepository;
};
