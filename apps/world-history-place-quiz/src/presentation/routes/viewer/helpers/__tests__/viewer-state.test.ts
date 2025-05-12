import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { beforeEach, describe, expect, it } from "vitest";
import { createViewerState } from "../viewer-state.svelte";

describe("createViewerState", () => {
	let viewerState: ReturnType<typeof createViewerState>;

	beforeEach(() => {
		viewerState = createViewerState();
	});

	describe("showFilterPanel", () => {
		it("should show the filter panel", () => {
			viewerState.showFilterPanel();
			expect(viewerState.isFilterPanelVisible).toBe(true);
		});

		it("should unselect the geo feature", () => {
			viewerState.showFilterPanel();
			expect(viewerState.selectedGeoFeatureId).toBeNull();
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
			viewerState.selectGeoFeature("pyrenees");
			expect(viewerState.selectedGeoFeatureId).toBe("pyrenees");
		});

		it("should hide the filter panel", () => {
			viewerState.selectGeoFeature("pyrenees");
			expect(viewerState.isFilterPanelVisible).toBe(false);
		});
	});

	describe("unselectGeoFeature", () => {
		it("should unselect the geo feature", () => {
			viewerState.unselectGeoFeature();
			expect(viewerState.selectedGeoFeatureId).toBeNull();
		});
	});
});
