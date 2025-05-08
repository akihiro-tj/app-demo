import { GeoFeature } from "@/domain/models/geo-feature";
import type { IGeoFeatureRepository } from "@/domain/repositories/geo-feature";
import { geoFeatureSchema } from "@/domain/schemas/geo-feature";
import { FsUtils } from "@app-demo/fs-utils";
import { validateSchema } from "./helpers/validate-schema";

export class FileGeoFeatureRepository implements IGeoFeatureRepository {
	private readonly fsUtils: FsUtils;

	constructor(private readonly dataPath: string) {
		this.fsUtils = new FsUtils();
	}

	async findAll(): Promise<GeoFeature[]> {
		const geoFeatureTypes = this.fsUtils.getDirNames(this.dataPath);
		const geoFeatures = geoFeatureTypes.flatMap((type) => {
			const fileNames = this.fsUtils.getFileNames(`${this.dataPath}/${type}`);
			return fileNames.map((fileName) => {
				const filePath = `${this.dataPath}/${type}/${fileName}`;
				const rawGeoFeature = this.fsUtils.loadYaml(filePath);
				const geoFeature = validateSchema(
					geoFeatureSchema,
					rawGeoFeature,
					filePath,
				);
				return GeoFeature.create({
					id: geoFeature.id,
					type,
				});
			});
		});
		return geoFeatures;
	}
}
