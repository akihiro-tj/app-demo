import { type GeoFeatureProps, GeoFeatureType } from "../geo-feature";

export const validGeoFeature: GeoFeatureProps = {
	id: "ピレネー山脈",
	type: GeoFeatureType.MOUNTAIN,
};

export const invalidGeoFeatureWithEmptyId: GeoFeatureProps = {
	...validGeoFeature,
	id: "",
};

export const invalidGeoFeatureWithInvalidType: GeoFeatureProps = {
	...validGeoFeature,
	type: "invalid-type",
};
