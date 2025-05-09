export interface GeoFeatureProps {
	id: string;
	category: string;
}

export enum GeoFeatureCategory {
	MOUNTAIN = "mountain",
	ISLAND = "island",
}

export class GeoFeature {
	private readonly id: string;
	private readonly category: GeoFeatureCategory;

	private constructor(id: string, category: string) {
		if (!id) {
			throw new Error("GeoFeature id must not be empty");
		}
		if (!this.isGeoFeatureCategory(category)) {
			throw new Error("Invalid GeoFeature category");
		}

		this.id = id;
		this.category = category;
	}

	static create(props: GeoFeatureProps): GeoFeature {
		return new GeoFeature(props.id, props.category);
	}

	private isGeoFeatureCategory(
		category: string,
	): category is GeoFeatureCategory {
		return Object.values(GeoFeatureCategory).includes(
			category as GeoFeatureCategory,
		);
	}

	getId(): string {
		return this.id;
	}

	getCategory(): GeoFeatureCategory {
		return this.category;
	}
}
