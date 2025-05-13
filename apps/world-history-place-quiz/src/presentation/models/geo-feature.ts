import type { GeoFeatureCategory } from "@/domain/models/geo-feature";

export interface GeoFeatureViewModel {
	id: number;
	name: string;
	category: GeoFeatureCategory;
}
