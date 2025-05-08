import type { GeoFeature } from "../models/geo-feature";

export interface IGeoFeatureRepository {
	findAll(): Promise<GeoFeature[]>;
}
