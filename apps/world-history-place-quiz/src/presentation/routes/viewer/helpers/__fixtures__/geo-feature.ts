import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";
export const mockGeoFeatures: GeoFeatureViewModel[] = [
	{
		id: 1159103941,
		name: "ピレネー山脈",
		category: GeoFeatureCategory.MOUNTAIN,
	},
];
