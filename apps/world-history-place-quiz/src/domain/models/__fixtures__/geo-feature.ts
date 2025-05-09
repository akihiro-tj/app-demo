import { GeoFeatureCategory, type GeoFeatureProps } from "../geo-feature";

export const validGeoFeature: GeoFeatureProps = {
	id: "ピレネー山脈",
	category: GeoFeatureCategory.MOUNTAIN,
};

export const invalidGeoFeatureWithEmptyId: GeoFeatureProps = {
	...validGeoFeature,
	id: "",
};

export const invalidGeoFeatureWithInvalidCategory: GeoFeatureProps = {
	...validGeoFeature,
	category: "invalid-category",
};
