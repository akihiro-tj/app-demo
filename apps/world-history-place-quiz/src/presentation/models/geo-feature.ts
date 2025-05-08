import type { GeoFeatureType } from "@/domain/models/geo-feature";

export interface GeoFeatureViewModel {
	id: string;
	type: GeoFeatureType;
}
