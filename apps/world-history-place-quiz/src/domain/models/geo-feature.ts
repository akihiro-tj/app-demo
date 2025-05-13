export interface GeoFeatureProps {
	id: number;
	name: string;
	category: string;
}

export enum GeoFeatureCategory {
	MOUNTAIN = "mountain",
	ISLAND = "island",
}

export class GeoFeature {
	private readonly id: number;
	private readonly name: string;
	private readonly category: GeoFeatureCategory;

	private constructor(id: number, name: string, category: string) {
		if (!id) {
			throw new Error("GeoFeature id must not be empty");
		}
		if (!this.isGeoFeatureCategory(category)) {
			throw new Error("Invalid GeoFeature category");
		}

		this.id = id;
		this.name = name;
		this.category = category;
	}

	static create(props: GeoFeatureProps): GeoFeature {
		return new GeoFeature(props.id, props.name, props.category);
	}

	private isGeoFeatureCategory(
		category: string,
	): category is GeoFeatureCategory {
		return Object.values(GeoFeatureCategory).includes(
			category as GeoFeatureCategory,
		);
	}

	getId(): number {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getCategory(): GeoFeatureCategory {
		return this.category;
	}
}
