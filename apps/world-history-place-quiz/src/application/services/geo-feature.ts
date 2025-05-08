import { ValidationError } from "@/domain/errors/validation-error";
import type { GeoFeature } from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

export async function getGeoFeatures(
	geoFeatureRepository: IGeoFeatureRepository,
): Promise<GeoFeatureViewModel[]> {
	try {
		const geoFeatures = await geoFeatureRepository.findAll();
		return geoFeatures.map(mapGeoFeatureToViewModel);
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new Error(
			`Failed to get geo feature: ${error instanceof Error ? error.message : ""}`,
		);
	}
}

function mapGeoFeatureToViewModel(geoFeature: GeoFeature): GeoFeatureViewModel {
	return {
		id: geoFeature.getId(),
		type: geoFeature.getType(),
	};
}
