import type { ContentsOrder } from "@/domain/entities/contents-order";
import type { FileLoader } from "@app-demo/file-loader";

export interface IContentsOrderRepository {
	find(): ContentsOrder;
}

export interface ContentsOrderRepositoryArgs {
	fileLoader: FileLoader;
	dataPath: `${string}/`;
}
