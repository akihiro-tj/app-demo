import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

interface ViewerState {
	filterGroups: FilterGroup[];
	geoFeaturesByCategory: GeoFeaturesByCategory;
	updateFilter: (category: GeoFeatureCategory, isVisible: boolean) => void;
}

interface FilterGroup {
	id: string;
	label: string;
	filter: Filter;
}

type GeoFeaturesByCategory = Record<GeoFeatureCategory, GeoFeatureViewModel[]>;

type Filter = {
	[key in GeoFeatureCategory]: boolean;
};

export const createViewerState = (
	geoFeatures: GeoFeatureViewModel[],
): ViewerState => {
	const filterGroups = $state<FilterGroup[]>([
		{
			id: "terrain",
			label: "地形",
			filter: {
				[GeoFeatureCategory.MOUNTAIN]: true,
				[GeoFeatureCategory.ISLAND]: true,
			},
		},
	]);

	const allFilter = $derived<Filter>(
		filterGroups.reduce(
			(acc, group) => Object.assign(acc, group.filter),
			{} as Filter,
		),
	);

	const geoFeaturesByCategory = $derived<GeoFeaturesByCategory>(
		geoFeatures.reduce((acc, feature) => {
			acc[feature.category] = [...(acc[feature.category] ?? []), feature];
			return acc;
		}, {} as GeoFeaturesByCategory),
	);

	const filteredGeoFeaturesByCategory = $derived<GeoFeaturesByCategory>(
		Object.values(GeoFeatureCategory).reduce((acc, category) => {
			acc[category] = geoFeaturesByCategory[category].filter(
				(feature) => allFilter[feature.category],
			);
			return acc;
		}, {} as GeoFeaturesByCategory),
	);

	return {
		get filterGroups(): FilterGroup[] {
			return filterGroups;
		},
		get geoFeaturesByCategory(): GeoFeaturesByCategory {
			return filteredGeoFeaturesByCategory;
		},
		updateFilter: (category: GeoFeatureCategory, isVisible: boolean) => {
			const targetFilterGroup = filterGroups.find((group) =>
				Object.keys(group.filter).some((key) => key === category),
			);
			if (!targetFilterGroup) {
				return;
			}
			const targetFilter = targetFilterGroup.filter;
			targetFilter[category] = isVisible;
		},
	};
};
