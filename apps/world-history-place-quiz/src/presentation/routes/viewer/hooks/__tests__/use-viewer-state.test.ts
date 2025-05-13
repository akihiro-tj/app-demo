import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { beforeEach, describe, expect, it } from "vitest";
import { mockGeoFeatures } from "../__fixtures__/geo-feature";
import { useViewerState } from "../use-viewer-state.svelte";

describe("useViewerState", () => {
	let viewerState: ReturnType<typeof useViewerState>;

	beforeEach(() => {
		viewerState = useViewerState(mockGeoFeatures);
	});

	describe("showFilterPanel", () => {
		it("should show the filter panel", () => {
			viewerState.showFilterPanel();
			expect(viewerState.isFilterPanelVisible).toBe(true);
		});

		it("should unselect the geo feature", () => {
			viewerState.showFilterPanel();
			expect(viewerState.selectedGeoFeature).toBeNull();
		});
	});

	describe("hideFilterPanel", () => {
		it("should hide the filter panel", () => {
			viewerState.hideFilterPanel();
			expect(viewerState.isFilterPanelVisible).toBe(false);
		});
	});

	describe("updateFilter", () => {
		it("should update the filter", () => {
			viewerState.updateFilter(GeoFeatureCategory.MOUNTAIN, true);
			expect(viewerState.filter.mountain).toBe(true);
			viewerState.updateFilter(GeoFeatureCategory.MOUNTAIN, false);
			expect(viewerState.filter.mountain).toBe(false);
		});

		it("should update the filter group", () => {
			viewerState.updateFilter(GeoFeatureCategory.MOUNTAIN, true);
			viewerState.updateFilter(GeoFeatureCategory.ISLAND, false);
			expect(viewerState.filterGroups).toContainEqual({
				id: "terrain",
				label: "地形",
				filter: {
					[GeoFeatureCategory.MOUNTAIN]: true,
					[GeoFeatureCategory.ISLAND]: false,
				},
			});
		});
	});

	describe("selectGeoFeature", () => {
		it("should select the geo feature", () => {
			viewerState.selectGeoFeature(1159103941);
			expect(viewerState.selectedGeoFeature?.id).toBe(1159103941);
		});

		it("should hide the filter panel", () => {
			viewerState.selectGeoFeature(1159103941);
			expect(viewerState.isFilterPanelVisible).toBe(false);
		});
	});

	describe("unselectGeoFeature", () => {
		it("should unselect the geo feature", () => {
			viewerState.unselectGeoFeature();
			expect(viewerState.selectedGeoFeature).toBeNull();
		});
	});
});
