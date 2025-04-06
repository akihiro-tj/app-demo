import { OGType } from "@/application/constants/meta-content";
import type { Content } from "@/application/interfaces/content";
import type { MetaContent } from "@/application/interfaces/meta-content";
import { SITE_NAME, SITE_ORIGIN } from "@/presentation/routes/constant";

export const getMetaContent = (content: Content): MetaContent => {
	return {
		title: `${content.title} | ${SITE_NAME}`,
		ogTitle: `${content.title} | ${SITE_NAME}`,
		ogType: OGType.Article,
		ogURL: `${SITE_ORIGIN}${content.path}`,
		ogImage: `${SITE_ORIGIN}${content.path}/og-image.png`,
	};
};
