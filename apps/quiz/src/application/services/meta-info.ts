import { base } from "$app/paths";
import { OGType } from "@/application/constants/meta-info";
import { appConfig } from "@world-history-map/app-config";

interface MetaInfo {
	title: string;
	ogTitle: string;
	ogType: OGType;
	ogURL: string;
	ogImage: string;
}

interface MetaInfoOptions {
	title?: string;
	path?: string;
}

const baseUrl = `${appConfig.origin}${base}`;

export function generateMetaInfo(options: MetaInfoOptions = {}): MetaInfo {
	const { title, path } = options;
	const isTopPage = !title && !path;

	return {
		title: isTopPage ? appConfig.name : `${title} | ${appConfig.name}`,
		ogTitle: isTopPage ? appConfig.name : `${title} | ${appConfig.name}`,
		ogType: isTopPage ? OGType.Website : OGType.Article,
		ogURL: isTopPage ? baseUrl : `${baseUrl}${path}`,
		ogImage: isTopPage
			? `${baseUrl}/og-image.png`
			: `${baseUrl}${path}/og-image.png`,
	};
}
