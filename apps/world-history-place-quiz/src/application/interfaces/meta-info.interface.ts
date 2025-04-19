import type { OGType } from "@/application/constants/meta-info.constant";

export interface MetaInfo {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}

export interface MetaInfoOptions {
	title?: string;
	path?: string;
}
