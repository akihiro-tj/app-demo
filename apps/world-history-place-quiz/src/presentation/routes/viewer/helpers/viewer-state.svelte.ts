import { GeoFeatureCategory } from "@/domain/models/geo-feature";

interface ViewerState {
	isFilterPanelVisible: boolean;
	selectedGeoFeatureId: string | null;
	filterGroups: FilterGroup[];
	filter: Filter;
	showFilterPanel: () => void;
	hideFilterPanel: () => void;
	updateFilter: (category: GeoFeatureCategory, isVisible: boolean) => void;
	selectGeoFeature: (geoFeatureId: string) => void;
	unselectGeoFeature: () => void;
}

interface FilterGroup {
	id: string;
	label: string;
	filter: Filter;
}

type Filter = Record<GeoFeatureCategory, boolean>;

export const createViewerState = (): ViewerState => {
	let isFilterPanelVisible = $state(window.innerWidth > 768);
	let selectedGeoFeatureId = $state<string | null>(null);

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
		get selectedGeoFeatureId(): string | null {
			return selectedGeoFeatureId;
		},
		get filterGroups(): FilterGroup[] {
			return filterGroups;
		},
		get filter(): Filter {
			return flattenedFilter;
		},
		showFilterPanel: () => {
			isFilterPanelVisible = true;
			selectedGeoFeatureId = null;
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
		selectGeoFeature: (geoFeatureId: string) => {
			selectedGeoFeatureId = geoFeatureId;
			isFilterPanelVisible = false;
		},
		unselectGeoFeature: () => {
			selectedGeoFeatureId = null;
		},
	};
};
