import type { ContentsOrder } from "@/domain/entities/contents-order";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentsOrderRepository {
	get(): ContentsOrder;
}

export interface ContentsOrderRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}
