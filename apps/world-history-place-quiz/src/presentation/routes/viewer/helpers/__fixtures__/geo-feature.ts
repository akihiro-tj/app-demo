import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

export const mockGeoFeatures: GeoFeatureViewModel[] = [
	{ id: "ピレネー山脈", category: GeoFeatureCategory.MOUNTAIN },
	{ id: "コルシカ島", category: GeoFeatureCategory.ISLAND },
];
