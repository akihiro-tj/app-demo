export interface GeoFeatureProps {
	id: string;
	type: string;
}

export enum GeoFeatureType {
	MOUNTAIN = "mountain",
	ISLAND = "island",
}

export class GeoFeature {
	private readonly id: string;
	private readonly type: GeoFeatureType;

	private constructor(id: string, type: string) {
		if (!id) {
			throw new Error("GeoFeature id must not be empty");
		}
		if (!this.isGeoFeatureType(type)) {
			throw new Error("Invalid GeoFeature type");
		}

		this.id = id;
		this.type = type;
	}

	static create(props: GeoFeatureProps): GeoFeature {
		return new GeoFeature(props.id, props.type);
	}

	private isGeoFeatureType(type: string): type is GeoFeatureType {
		return Object.values(GeoFeatureType).includes(type as GeoFeatureType);
	}

	getId(): string {
		return this.id;
	}

	getType(): GeoFeatureType {
		return this.type;
	}
}
