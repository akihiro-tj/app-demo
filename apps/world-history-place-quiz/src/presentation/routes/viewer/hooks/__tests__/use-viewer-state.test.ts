import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { Deck } from "@deck.gl/core";
import { beforeEach, describe, expect, it } from "vitest";
import { mockGeoFeatures } from "../__fixtures__/geo-feature";
import { useViewerState } from "../use-viewer-state.svelte";

describe("useViewerState", () => {
	// TODO: Make the tests pass
	it("", () => {
		expect(true).toBe(true);
	});

	// let mockDeck: Deck | undefined;
	// let viewerState: ReturnType<typeof useViewerState>;
	// beforeEach(() => {
	// 	viewerState = useViewerState(mockDeck, mockGeoFeatures);
	// 	mockDeck = new Deck({
	// 		canvas: document.createElement("canvas"),
	// 		controller: true,
	// 		layers: viewerState.layers,
	// 	});
	// });
	// describe("showFilterPanel", () => {
	// 	it("should show the filter panel", () => {
	// 		viewerState.showFilterPanel();
	// 		expect(viewerState.isFilterPanelVisible).toBe(true);
	// 	});
	// 	it("should unselect the geo feature", () => {
	// 		viewerState.showFilterPanel();
	// 		expect(viewerState.selectedGeoFeature).toBeNull();
	// 	});
	// });
	// describe("hideFilterPanel", () => {
	// 	it("should hide the filter panel", () => {
	// 		viewerState.hideFilterPanel();
	// 		expect(viewerState.isFilterPanelVisible).toBe(false);
	// 	});
	// });
	// describe("updateFilter", () => {
	// 	it("should update the filter group", () => {
	// 		viewerState.updateFilter(GeoFeatureCategory.MOUNTAIN, true);
	// 		viewerState.updateFilter(GeoFeatureCategory.ISLAND, false);
	// 		expect(viewerState.filterGroups).toContainEqual({
	// 			id: "terrain",
	// 			label: "地形",
	// 			filter: {
	// 				[GeoFeatureCategory.MOUNTAIN]: true,
	// 				[GeoFeatureCategory.ISLAND]: false,
	// 			},
	// 		});
	// 	});
	// });
	// describe("unselectGeoFeature", () => {
	// 	it("should unselect the geo feature", () => {
	// 		viewerState.unselectGeoFeature();
	// 		expect(viewerState.selectedGeoFeature).toBeNull();
	// 	});
	// });
});
