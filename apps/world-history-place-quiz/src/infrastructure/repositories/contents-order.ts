import type {
	ContentsOrderRepositoryArgs,
	IContentsOrderRepository,
} from "@/application/interfaces/contents-order-repository";
import {
	ContentsOrder,
	type IContentsOrder,
} from "@/domain/entities/contents-order";
import type { RawContentsOrder } from "@/domain/schemas/contents-order";
import { rawContentsOrderSchema } from "@/infrastructure/schemas/contents-order";
import { parseRawData } from "@/utils/parse-raw-data";

export class ContentsOrderRepository implements IContentsOrderRepository {
	private fileLoader: ContentsOrderRepositoryArgs["fileLoader"];
	private dataPath: ContentsOrderRepositoryArgs["dataPath"];

	constructor({ fileLoader, dataPath }: ContentsOrderRepositoryArgs) {
		this.fileLoader = fileLoader;
		this.dataPath = dataPath;
	}

	find(): IContentsOrder {
		const filePath = `${this.dataPath}order.yaml`;
		const rawContentsOrder = parseRawData<RawContentsOrder>(
			rawContentsOrderSchema,
			this.fileLoader.loadYaml(filePath),
		);
		return new ContentsOrder(rawContentsOrder);
	}
}
