import { GeoFeatureType } from "@/domain/models/geo-feature";
import type { Color } from "@deck.gl/core";
import { hexToRgb } from "../helpers/hex-to-rgb";

export const LAND_TILE_SOURCE_URL =
	"/viewer/tiles/ne_50m_admin_0_countries--z10_z0.pmtiles";
export const REGION_TILE_SOURCE_URL =
	"/viewer/tiles/ne_50m_geography_regions_polys--z10_z0.pmtiles";

export const COLOR_TRANSPARENT: Color = [0, 0, 0, 0];
export const COLOR_FOREGROUND: Color = hexToRgb("#f1f5f9");
export const COLOR_BACKGROUND: Color = hexToRgb("#94a3b8");

export const GEO_FEATURE_COLORS: Record<GeoFeatureType, Color> = {
	[GeoFeatureType.MOUNTAIN]: [0, 255, 0],
	[GeoFeatureType.ISLAND]: [0, 0, 255],
};

export const FILL_OPACITY = 0.8;
