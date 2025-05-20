import type { MapViewState } from "@deck.gl/core";

export enum GeoFeatureCategory {
	MOUNTAIN = "mountain",
	ISLAND = "island",
}

export const GEO_FEATURE_CATEGORY_NAMES: Record<GeoFeatureCategory, string> = {
	[GeoFeatureCategory.MOUNTAIN]: "山脈",
	[GeoFeatureCategory.ISLAND]: "島",
};

export enum CursorState {
	GRAB = "grab",
	GRABBING = "grabbing",
	POINTER = "pointer",
}

export const INITIAL_VIEW_STATE: MapViewState = {
	longitude: 18.382992,
	latitude: 45.404543,
	zoom: 3,
	minZoom: 0,
	maxZoom: 10,
};
