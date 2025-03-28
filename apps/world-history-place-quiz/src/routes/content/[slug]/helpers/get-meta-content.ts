import { SITE_ORIGIN } from "@/routes/constant";
import type { Content } from "@/routes/types/content";
import { type MetaContent, OGType } from "@/routes/types/meta-content";

export const getMetaContent = (content: Content): MetaContent => {
	return {
		title: content.title,
		ogTitle: content.title,
		ogType: OGType.Article,
		ogURL: `${SITE_ORIGIN}${content.path}`,
		ogImage: `${SITE_ORIGIN}${content.path}/img/og-image.png`,
	};
};
