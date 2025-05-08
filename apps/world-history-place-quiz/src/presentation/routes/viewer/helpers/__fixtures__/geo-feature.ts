import { GeoFeatureType } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

export const mockGeoFeatures: GeoFeatureViewModel[] = [
	{ id: "ピレネー山脈", type: GeoFeatureType.MOUNTAIN },
	{ id: "コルシカ島", type: GeoFeatureType.ISLAND },
];
