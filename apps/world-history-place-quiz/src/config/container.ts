import type { IContentRepository } from "@/application/interfaces/content-repository";
import type { ContentService as IContentService } from "@/application/interfaces/content-service";
import type { IContentsOrderRepository } from "@/application/interfaces/contents-order-repository";
import { ContentService } from "@/application/services/content";
import { ContentRepository } from "@/infrastructure/repositories/content";
import { ContentsOrderRepository } from "@/infrastructure/repositories/contents-order";
import { FileLoader } from "@app-demo/file-loader";

const CONTENTS_PATH = "./contents/";

export class Container {
	createContentRepository(): IContentRepository {
		const fileLoader = new FileLoader();
		return new ContentRepository({
			fileLoader,
			dataPath: CONTENTS_PATH,
		});
	}

	createContentsOrderRepository(): IContentsOrderRepository {
		const fileLoader = new FileLoader();
		return new ContentsOrderRepository({
			fileLoader,
			dataPath: CONTENTS_PATH,
		});
	}

	createContentService(): IContentService {
		const contentRepository = this.createContentRepository();
		const contentsOrderRepository = this.createContentsOrderRepository();

		return new ContentService(contentRepository, contentsOrderRepository);
	}
}

export const container = new Container();
