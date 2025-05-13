import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";
import type { Deck, Layer } from "@deck.gl/core";
import { getIslandTileLayer } from "./layers/island-tile";
import { getLandTileLayer } from "./layers/land-tile";
import { getMountainTileLayer } from "./layers/mountain-tile";

interface ViewerState {
	isFilterPanelVisible: boolean;
	selectedGeoFeature: GeoFeatureViewModel | null;
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

export const useViewerState = (
	deck: Deck | undefined,
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

	const updateGeoFeature = (geoFeatureId: number) => {
		selectedGeoFeature =
			geoFeatures.find((geoFeature) => geoFeature.id === geoFeatureId) ?? null;
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

	$effect(() => {
		if (deck) {
			deck.setProps({ layers });
		}
	});

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
		get layers(): Layer[] {
			return layers;
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
		unselectGeoFeature: () => {
			selectedGeoFeature = null;
		},
	};
};
