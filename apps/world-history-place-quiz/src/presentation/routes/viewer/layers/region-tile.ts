import type { GeoFeatureCategory } from "@/domain/models/geo-feature";
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
	id: GeoFeatureCategory,
	geoFeatures: GeoFeatureViewModel[],
): TileLayerType => {
	const regionTileSource = new PMTilesTileSource(REGION_TILE_SOURCE_URL, {});

	return new TileLayer({
		id,
		getTileData: regionTileSource.getTileData,
		renderSubLayers: (props) => {
			const bbox = props.tile.boundingBox;
			return new GeoJsonLayer({
				id: `${id}-${props.tile.id}`,
				data: props.data,
				extensions: [new ClipExtension()],
				clipBounds: [bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]],
				getFillColor: (d) => {
					const geoFeature = geoFeatures.find(
						(geoFeature) => geoFeature.id === d.properties.NAME_JA,
					);
					return geoFeature
						? ([
								...GEO_FEATURE_COLORS[geoFeature.category],
								255 * FILL_OPACITY,
							] as Color)
						: COLOR_TRANSPARENT;
				},
				getLineColor: (d) => {
					const geoFeature = geoFeatures.find(
						(geoFeature) => geoFeature.id === d.properties.NAME_JA,
					);
					return geoFeature
						? GEO_FEATURE_COLORS[geoFeature.category]
						: COLOR_TRANSPARENT;
				},
				lineWidthMinPixels: 3,
			});
		},
	});
};
