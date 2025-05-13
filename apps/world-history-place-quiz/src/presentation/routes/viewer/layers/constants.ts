import { GeoFeatureCategory } from "@/domain/models/geo-feature";
import type { Color } from "@deck.gl/core";
import { hexToRgb } from "../helpers/hex-to-rgb";

export const LAND_TILE_SOURCE_URL = "/viewer/tiles/land.pmtiles";
export const MOUNTAIN_TILE_SOURCE_URL = "/viewer/tiles/mountain.pmtiles";
export const ISLAND_TILE_SOURCE_URL = "/viewer/tiles/island.pmtiles";

export const LAND_TILE_LAYER_ID = "land-tile-layer";
export const MOUNTAIN_TILE_LAYER_ID = "mountain-tile-layer";
export const ISLAND_TILE_LAYER_ID = "island-tile-layer";

export const COLOR_TRANSPARENT: Color = [0, 0, 0, 0];
export const COLOR_FOREGROUND: Color = hexToRgb("#f1f5f9");
export const COLOR_BACKGROUND: Color = hexToRgb("#94a3b8");

export const COLOR_MOUNTAIN: Color = hexToRgb("#14b8a6");
export const COLOR_ISLAND: Color = hexToRgb("#f43f5e");

export const GEO_FEATURE_COLORS: Record<GeoFeatureCategory, Color> = {
	[GeoFeatureCategory.MOUNTAIN]: [0, 255, 0],
	[GeoFeatureCategory.ISLAND]: [0, 0, 255],
};

export const FILL_OPACITY = 0.8;
