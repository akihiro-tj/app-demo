export interface IContentsOrder {
	contentIds: string[];
}

export class ContentsOrder implements IContentsOrder {
	readonly contentIds: IContentsOrder["contentIds"];

	constructor(contentIds: string[]) {
		this.contentIds = contentIds;
	}
}
