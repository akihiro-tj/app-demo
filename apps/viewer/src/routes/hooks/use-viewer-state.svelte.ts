import type { Layer } from "@deck.gl/core";
import { GeoFeatureCategory } from "../../constants";
import { getIslandTileLayer } from "./layers/island-tile";
import { getLandTileLayer } from "./layers/land-tile";
import { getMountainTileLayer } from "./layers/mountain-tile";

interface ViewerState {
	isFilterPanelVisible: boolean;
	selectedGeoFeatureId: number | null;
	filterGroups: FilterGroup[];
	layers: Layer[];
	showFilterPanel: () => void;
	hideFilterPanel: () => void;
	updateFilter: (category: GeoFeatureCategory, isVisible: boolean) => void;
	unselectGeoFeature: () => void;
}

interface FilterGroup {
	id: string;
	label: string;
	filter: Filter;
}

type Filter = Record<GeoFeatureCategory, boolean>;

export const useViewerState = (): ViewerState => {
	let isFilterPanelVisible = $state(window.innerWidth > 768);
	let selectedGeoFeatureId = $state<number | null>(null);

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

	const updateGeoFeature = (geoFeatureId: number) => {
		selectedGeoFeatureId = geoFeatureId;
		isFilterPanelVisible = false;
	};

	const layers = $derived<Layer[]>([
		getLandTileLayer(),
		getMountainTileLayer(
			flattenedFilter[GeoFeatureCategory.MOUNTAIN],
			updateGeoFeature,
		),
		getIslandTileLayer(
			flattenedFilter[GeoFeatureCategory.ISLAND],
			updateGeoFeature,
		),
	]);

	return {
		get isFilterPanelVisible(): boolean {
			return isFilterPanelVisible;
		},
		get selectedGeoFeatureId(): number | null {
			return selectedGeoFeatureId;
		},
		get filterGroups(): FilterGroup[] {
			return filterGroups;
		},
		get layers(): Layer[] {
			return layers;
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
		unselectGeoFeature: () => {
			selectedGeoFeatureId = null;
		},
	};
};
