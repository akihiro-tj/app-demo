import { ClipExtension } from "@deck.gl/extensions";
import {
	TileLayer,
	type TileLayer as TileLayerType,
} from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { PMTilesTileSource } from "@loaders.gl/pmtiles";
import { MOUNTAIN_TILE_LAYER_ID, MOUNTAIN_TILE_SOURCE_URL } from "./constants";

export const getMountainTileLayer = (
	onClick: (geoFeatureId: string) => void,
): TileLayerType => {
	const mountainTileSource = new PMTilesTileSource(
		MOUNTAIN_TILE_SOURCE_URL,
		{},
	);

	return new TileLayer({
		id: MOUNTAIN_TILE_LAYER_ID,
		getTileData: mountainTileSource.getTileData,
		onClick: (info) => {
			onClick(info.object.properties.NAME_JA);
		},
		renderSubLayers: (props) => {
			const bbox = props.tile.boundingBox;
			return new GeoJsonLayer({
				id: `${MOUNTAIN_TILE_LAYER_ID}-${props.tile.id}`,
				data: props.data,
				extensions: [new ClipExtension()],
				clipBounds: [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]],
				getFillColor: [0, 255, 0],
				getLineColor: [0, 255, 0],
				lineWidthMinPixels: 3,
				pickable: true,
			});
		},
	});
};
