import type { IContentsOrder } from "@/domain/entities/contents-order";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentsOrderRepository {
	find(): IContentsOrder;
}

export interface ContentsOrderRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}
