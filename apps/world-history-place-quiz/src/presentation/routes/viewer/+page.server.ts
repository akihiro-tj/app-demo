import { GEO_FEATURE_PATH } from "@/application/constants/content";
import { getGeoFeatures } from "@/application/services/geo-feature";
import { FileGeoFeatureRepository } from "@/infrastructure/repositories/get-feature";

export async function load() {
	const geoFeatureRepository = new FileGeoFeatureRepository(GEO_FEATURE_PATH);
	const geoFeatures = await getGeoFeatures(geoFeatureRepository);
	return { geoFeatures };
}
