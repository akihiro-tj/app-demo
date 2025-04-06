import { SITE_NAME, SITE_ORIGIN } from "@/routes/constant";
import type { Content } from "@/routes/types/content";
import { type MetaContent, OGType } from "@/routes/types/meta-content";

export const getMetaContent = (content: Content): MetaContent => {
	return {
		title: `${content.title} | ${SITE_NAME}`,
		ogTitle: `${content.title} | ${SITE_NAME}`,
		ogType: OGType.Article,
		ogURL: `${SITE_ORIGIN}${content.path}`,
		ogImage: `${SITE_ORIGIN}${content.path}/og-image.png`,
	};
};
