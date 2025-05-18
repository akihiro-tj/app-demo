import { base } from "$app/paths";
import { OGType } from "@/application/constants/meta-info";
import { SITE_NAME, SITE_ORIGIN } from "@/application/constants/site";

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

const baseUrl = `${SITE_ORIGIN}${base}`;

export function generateMetaInfo(options: MetaInfoOptions = {}): MetaInfo {
	const { title, path } = options;
	const isTopPage = !title && !path;

	return {
		title: isTopPage ? SITE_NAME : `${title} | ${SITE_NAME}`,
		ogTitle: isTopPage ? SITE_NAME : `${title} | ${SITE_NAME}`,
		ogType: isTopPage ? OGType.Website : OGType.Article,
		ogURL: isTopPage ? baseUrl : `${baseUrl}${path}`,
		ogImage: isTopPage
			? `${baseUrl}/og-image.png`
			: `${baseUrl}${path}/og-image.png`,
	};
}
