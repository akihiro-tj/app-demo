import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";

interface ViewerState {
	isFilterPanelVisible: boolean;
	selectedGeoFeature: GeoFeatureViewModel | null;
	filterGroups: FilterGroup[];
	filter: Filter;
	showFilterPanel: () => void;
	hideFilterPanel: () => void;
	updateFilter: (category: GeoFeatureCategory, isVisible: boolean) => void;
	selectGeoFeature: (geoFeatureId: number) => void;
	unselectGeoFeature: () => void;
}

interface FilterGroup {
	id: string;
	label: string;
	filter: Filter;
}

type Filter = Record<GeoFeatureCategory, boolean>;

export const createViewerState = (
	geoFeatures: GeoFeatureViewModel[],
): ViewerState => {
	let isFilterPanelVisible = $state(window.innerWidth > 768);
	let selectedGeoFeature = $state<GeoFeatureViewModel | null>(null);

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

	const flattenedFilter = $derived<Filter>(
		filterGroups.reduce(
			(acc, group) => Object.assign(acc, group.filter),
			{} as Filter,
		),
	);

	return {
		get isFilterPanelVisible(): boolean {
			return isFilterPanelVisible;
		},
		get selectedGeoFeature(): GeoFeatureViewModel | null {
			return selectedGeoFeature;
		},
		get filterGroups(): FilterGroup[] {
			return filterGroups;
		},
		get filter(): Filter {
			return flattenedFilter;
		},
		showFilterPanel: () => {
			isFilterPanelVisible = true;
			selectedGeoFeature = null;
		},
		hideFilterPanel: () => {
			isFilterPanelVisible = false;
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
		selectGeoFeature: (geoFeatureId: number) => {
			selectedGeoFeature =
				geoFeatures.find((geoFeature) => geoFeature.id === geoFeatureId) ??
				null;
			isFilterPanelVisible = false;
		},
		unselectGeoFeature: () => {
			selectedGeoFeature = null;
		},
	};
};
