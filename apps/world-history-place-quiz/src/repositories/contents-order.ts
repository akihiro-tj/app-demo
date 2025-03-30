import { ContentsOrder } from "@/entities/contents-order";
import {
	type RawContentsOrder,
	rawContentsOrderSchema,
} from "@/schemas/contents-order";
import { parseRawData } from "@/utils/parse-raw-data";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentsOrderRepository {
	get(): ContentsOrder;
}

export interface ContentsOrderRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}

export class ContentsOrderRepository implements IContentsOrderRepository {
	private fileLoader: ContentsOrderRepositoryArgs["fileLoader"];
	private dataPath: ContentsOrderRepositoryArgs["dataPath"];

	constructor({ fileLoader, dataPath }: ContentsOrderRepositoryArgs) {
		this.fileLoader = fileLoader;
		this.dataPath = dataPath;
	}

	get(): ContentsOrder {
		const filePath = `${this.dataPath}order.yaml`;
		const rawContentsOrder = parseRawData<RawContentsOrder>(
			rawContentsOrderSchema,
			this.fileLoader.loadYaml(filePath),
		);
		return new ContentsOrder(rawContentsOrder);
	}
}
