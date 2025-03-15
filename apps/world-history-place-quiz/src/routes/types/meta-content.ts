export enum OGType {
	Article = "article",
	Website = "website",
}

export interface MetaContent {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}
