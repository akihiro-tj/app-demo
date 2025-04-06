import { OGType } from "@/application/constants/meta";
import type { Content } from "@/application/interfaces/content";
import type { Meta } from "@/application/interfaces/meta";
import { SITE_NAME, SITE_ORIGIN } from "@/presentation/routes/constant";

export const getMeta = (content: Content): Meta => {
	return {
		title: `${content.title} | ${SITE_NAME}`,
		ogTitle: `${content.title} | ${SITE_NAME}`,
		ogType: OGType.Article,
		ogURL: `${SITE_ORIGIN}${content.path}`,
		ogImage: `${SITE_ORIGIN}${content.path}/og-image.png`,
	};
};
