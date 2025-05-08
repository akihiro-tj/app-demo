import { GeoFeatureType } from "@/domain/models/geo-feature";
import { beforeEach, describe, expect, it } from "vitest";
import { mockGeoFeatures } from "../__fixtures__/geo-feature";
import { createViewerState } from "../viewer-state.svelte";

describe("createViewerState", () => {
	let viewerState: ReturnType<typeof createViewerState>;

	beforeEach(() => {
		viewerState = createViewerState(mockGeoFeatures);
	});

	describe("filteredGeoFeatures", () => {
		it("should return the filtered geo features", () => {
			viewerState.setGeoFeatureTypeFilter(GeoFeatureType.MOUNTAIN, true);
			viewerState.setGeoFeatureTypeFilter(GeoFeatureType.ISLAND, false);
			expect(viewerState.filteredGeoFeatures).toEqual([mockGeoFeatures[0]]);
		});
	});
});
