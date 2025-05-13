import { GeoFeatureCategory, type GeoFeatureProps } from "../geo-feature";

export const validGeoFeature: GeoFeatureProps = {
	id: 1159103941,
	name: "ピレネー山脈",
	category: GeoFeatureCategory.MOUNTAIN,
};

export const invalidGeoFeatureWithInvalidCategory: GeoFeatureProps = {
	...validGeoFeature,
	category: "invalid-category",
};
