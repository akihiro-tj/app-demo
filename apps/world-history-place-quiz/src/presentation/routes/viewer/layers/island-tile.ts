import type { Color } from "@deck.gl/core";
import { ClipExtension } from "@deck.gl/extensions";
import {
	TileLayer,
	type TileLayer as TileLayerType,
} from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { PMTilesTileSource } from "@loaders.gl/pmtiles";
import {
	COLOR_ISLAND,
	FILL_OPACITY,
	ISLAND_TILE_LAYER_ID,
	ISLAND_TILE_SOURCE_URL,
} from "./constants";

export const getIslandTileLayer = (
	onClick: (geoFeatureId: number) => void,
): TileLayerType => {
	const islandTileSource = new PMTilesTileSource(ISLAND_TILE_SOURCE_URL, {});

	return new TileLayer({
		id: ISLAND_TILE_LAYER_ID,
		getTileData: islandTileSource.getTileData,
		onClick: (info) => {
			onClick(info.object.properties.NE_ID);
		},
		renderSubLayers: (props) => {
			const bbox = props.tile.boundingBox;
			return new GeoJsonLayer({
				id: `${ISLAND_TILE_LAYER_ID}-${props.tile.id}`,
				data: props.data,
				extensions: [new ClipExtension()],
				clipBounds: [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]],
				getFillColor: [...COLOR_ISLAND, 255 * FILL_OPACITY] as Color,
				getLineColor: COLOR_ISLAND,
				lineWidthMinPixels: 3,
				pickable: true,
			});
		},
	});
};
