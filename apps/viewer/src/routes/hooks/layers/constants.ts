import { base } from "$app/paths";
import type { Color } from "@deck.gl/core";
import { hexToRgb } from "../../utils/hex-to-rgb";

export const LAND_TILE_SOURCE_URL = `${base}/tiles/land.pmtiles`;
export const LAND_TILE_LAYER_ID = "land-tile-layer";

export const COLOR_TRANSPARENT: Color = [0, 0, 0, 0];
export const COLOR_FOREGROUND: Color = hexToRgb("#f1f5f9");
export const COLOR_BACKGROUND: Color = hexToRgb("#94a3b8");

export const FILL_OPACITY = 0.8;

export const MOUNTAIN_TILE_SOURCE_URL = `${base}/tiles/mountain.pmtiles`;
export const PLATEAU_TILE_SOURCE_URL = `${base}/tiles/plateau.pmtiles`;
export const DESERT_TILE_SOURCE_URL = `${base}/tiles/desert.pmtiles`;
export const ISLAND_TILE_SOURCE_URL = `${base}/tiles/island.pmtiles`;
export const PENINSULA_TILE_SOURCE_URL = `${base}/tiles/peninsula.pmtiles`;

export const MOUNTAIN_TILE_LAYER_ID = "mountain-tile-layer";
export const PLATEAU_TILE_LAYER_ID = "plateau-tile-layer";
export const DESERT_TILE_LAYER_ID = "desert-tile-layer";
export const ISLAND_TILE_LAYER_ID = "island-tile-layer";
export const PENINSULA_TILE_LAYER_ID = "peninsula-tile-layer";

export const COLOR_MOUNTAIN: Color = hexToRgb("#3b82f6");
export const COLOR_PLATEAU: Color = hexToRgb("#3b82f6");
export const COLOR_DESERT: Color = hexToRgb("#3b82f6");
export const COLOR_ISLAND: Color = hexToRgb("#3b82f6");
export const COLOR_PENINSULA: Color = hexToRgb("#3b82f6");
