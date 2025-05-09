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
		const geoFeatureCategories = this.fsUtils.getDirNames(this.dataPath);
		const geoFeatures = geoFeatureCategories.flatMap((category) => {
			const fileNames = this.fsUtils.getFileNames(
				`${this.dataPath}/${category}`,
			);
			return fileNames.map((fileName) => {
				const filePath = `${this.dataPath}/${category}/${fileName}`;
				const rawGeoFeature = this.fsUtils.loadYaml(filePath);
				const geoFeature = validateSchema(
					geoFeatureSchema,
					rawGeoFeature,
					filePath,
				);
				return GeoFeature.create({
					id: geoFeature.id,
					category,
				});
			});
		});
		return geoFeatures;
	}
}
