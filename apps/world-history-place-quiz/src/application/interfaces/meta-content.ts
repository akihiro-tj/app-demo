import type { OGType } from "../constants/meta-content";

export interface MetaContent {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}
