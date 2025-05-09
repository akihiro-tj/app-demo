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

export function generateMetaInfo(options: MetaInfoOptions = {}): MetaInfo {
	const { title, path } = options;
	const isTopPage = !title && !path;

	return {
		title: isTopPage ? SITE_NAME : `${title} | ${SITE_NAME}`,
		ogTitle: isTopPage ? SITE_NAME : `${title} | ${SITE_NAME}`,
		ogType: isTopPage ? OGType.Website : OGType.Article,
		ogURL: isTopPage ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`,
		ogImage: isTopPage
			? `${SITE_ORIGIN}/og-image.png`
			: `${SITE_ORIGIN}${path}/og-image.png`,
	};
}
