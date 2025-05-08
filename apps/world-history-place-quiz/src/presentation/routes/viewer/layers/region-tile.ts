import type { GeoFeatureViewModel } from "@/presentation/models/geo-feature";
import type { Color } from "@deck.gl/core";
import { ClipExtension } from "@deck.gl/extensions";
import {
	TileLayer,
	type TileLayer as TileLayerType,
} from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { PMTilesTileSource } from "@loaders.gl/pmtiles";
import { FILL_OPACITY, GEO_FEATURE_COLORS } from "./constants";
import { COLOR_TRANSPARENT } from "./constants";
import { REGION_TILE_SOURCE_URL } from "./constants";

export const getRegionTileLayer = (
	regions: GeoFeatureViewModel[],
): TileLayerType => {
	const regionTileSource = new PMTilesTileSource(REGION_TILE_SOURCE_URL, {});

	return new TileLayer({
		id: "region-tile-layer",
		getTileData: regionTileSource.getTileData,
		renderSubLayers: (props) => {
			const bbox = props.tile.boundingBox;
			return new GeoJsonLayer({
				id: `region-tile-layer--${props.tile.id}`,
				data: props.data,
				extensions: [new ClipExtension()],
				clipBounds: [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]],
				getFillColor: (d) => {
					const region = regions.find(
						(region) => region.id === d.properties.NAME_JA,
					);
					return region
						? ([
								...GEO_FEATURE_COLORS[region.type],
								255 * FILL_OPACITY,
							] as Color)
						: COLOR_TRANSPARENT;
				},
				getLineColor: (d) => {
					const region = regions.find(
						(region) => region.id === d.properties.NAME_JA,
					);
					return region ? GEO_FEATURE_COLORS[region.type] : COLOR_TRANSPARENT;
				},
				lineWidthMinPixels: 3,
			});
		},
	});
};
