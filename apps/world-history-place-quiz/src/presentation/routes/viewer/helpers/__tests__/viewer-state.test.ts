import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import { beforeEach, describe, expect, it } from "vitest";
import { mockGeoFeatures } from "../__fixtures__/geo-feature";
import { createViewerState } from "../viewer-state.svelte";

describe("createViewerState", () => {
	let viewerState: ReturnType<typeof createViewerState>;

	beforeEach(() => {
		viewerState = createViewerState(mockGeoFeatures);
	});

	describe("isFilterContainerVisible", () => {
		it("should return the filter container visible", () => {
			viewerState.showFilterContainer();
			expect(viewerState.isFilterContainerVisible).toBe(true);
			viewerState.hideFilterContainer();
			expect(viewerState.isFilterContainerVisible).toBe(false);
		});
	});

	describe("filterGroups", () => {
		it("should return the filter groups", () => {
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

	describe("geoFeaturesByCategory", () => {
		it("should return the geo features by category", () => {
			viewerState.updateFilter(GeoFeatureCategory.MOUNTAIN, true);
			viewerState.updateFilter(GeoFeatureCategory.ISLAND, false);
			expect(viewerState.geoFeaturesByCategory).toEqual({
				[GeoFeatureCategory.MOUNTAIN]: [mockGeoFeatures[0]],
				[GeoFeatureCategory.ISLAND]: [],
			});
		});
	});
});
