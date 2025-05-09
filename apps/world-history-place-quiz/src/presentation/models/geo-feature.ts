import type { GeoFeatureCategory } from "@/domain/models/geo-feature";

export interface GeoFeatureViewModel {
	id: string;
	category: GeoFeatureCategory;
}
