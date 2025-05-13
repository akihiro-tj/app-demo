import {
	type GeoFeature,
	GeoFeatureCategory,
} from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import { vi } from "vitest";

export const createMockGeoFeatures = (): GeoFeature[] => {
	return [
		{
			id: 1159103941,
			name: "ピレネー山脈",
			category: GeoFeatureCategory.MOUNTAIN,
			getId: vi.fn().mockReturnValue(1159103941),
			getName: vi.fn().mockReturnValue("ピレネー山脈"),
			getCategory: vi.fn().mockReturnValue(GeoFeatureCategory.MOUNTAIN),
		} as unknown as GeoFeature,
	];
};

export const createMockGeoFeatureRepository = (): IGeoFeatureRepository => {
	return {
		findAll: vi.fn(),
	} as unknown as IGeoFeatureRepository;
};
