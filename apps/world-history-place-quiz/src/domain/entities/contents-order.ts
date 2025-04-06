export interface IContentsOrder {
	contentIds: string[];
}

export class ContentsOrder implements IContentsOrder {
	readonly contentIds: string[];

	constructor(contentIds: string[]) {
		this.contentIds = contentIds;
	}
}
