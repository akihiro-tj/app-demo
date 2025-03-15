import { SITE_NAME, SITE_ORIGIN } from "../constant";
import { type MetaContent, OGType } from "../types/meta-content";

export const getMetaContent = (): MetaContent => {
	return {
		title: SITE_NAME,
		ogTitle: SITE_NAME,
		ogType: OGType.Website,
		ogURL: SITE_ORIGIN,
		ogImage: `${SITE_ORIGIN}/og-image.png`,
	};
};
