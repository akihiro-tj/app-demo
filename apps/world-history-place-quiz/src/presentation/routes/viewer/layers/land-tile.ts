import { ClipExtension } from "@deck.gl/extensions";
import { TileLayer } from "@deck.gl/geo-layers";
import type { TileLayer as TileLayerType } from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { PMTilesTileSource } from "@loaders.gl/pmtiles";
import { COLOR_TRANSPARENT } from "./constants";
import { COLOR_FOREGROUND } from "./constants";
import { ADMIN_TILE_SOURCE_URL } from "./constants";

const LAND_TILE_LAYER_ID = "land-tile-layer";

export const getLandTileLayer = (): TileLayerType => {
	const adminTileSource = new PMTilesTileSource(ADMIN_TILE_SOURCE_URL, {});

	return new TileLayer({
		id: LAND_TILE_LAYER_ID,
		getTileData: adminTileSource.getTileData,
		renderSubLayers: (props) => {
			const bbox = props.tile.boundingBox;
			return new GeoJsonLayer({
				id: `${LAND_TILE_LAYER_ID}-${props.tile.id}`,
				data: props.data,
				extensions: [new ClipExtension()],
				clipBounds: [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]],
				getLineColor: COLOR_TRANSPARENT,
				lineWidthMinPixels: 1,
				getFillColor: COLOR_FOREGROUND,
			});
		},
	});
};
