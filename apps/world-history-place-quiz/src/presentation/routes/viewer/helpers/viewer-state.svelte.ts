import { GeoFeatureType } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

interface ViewerState {
	filteredGeoFeatures: GeoFeatureViewModel[];
	setGeoFeatureTypeFilter: (type: GeoFeatureType, isVisible: boolean) => void;
}

export const createViewerState = (
	geoFeatures: GeoFeatureViewModel[],
): ViewerState => {
	const geoFeatureTypeFilter = $state<Record<GeoFeatureType, boolean>>({
		[GeoFeatureType.MOUNTAIN]: true,
		[GeoFeatureType.ISLAND]: true,
	});

	const filteredGeoFeatures = $derived(
		geoFeatures.filter((geoFeature) => geoFeatureTypeFilter[geoFeature.type]),
	);

	return {
		get filteredGeoFeatures(): GeoFeatureViewModel[] {
			return filteredGeoFeatures;
		},
		setGeoFeatureTypeFilter: (type: GeoFeatureType, isVisible: boolean) => {
			geoFeatureTypeFilter[type] = isVisible;
		},
	};
};
