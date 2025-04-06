import type { IContentsOrder } from "../interfaces/contents-order";

export class ContentsOrder implements IContentsOrder {
	readonly contentIds: string[];

	constructor(contentIds: string[]) {
		this.contentIds = contentIds;
	}
}
