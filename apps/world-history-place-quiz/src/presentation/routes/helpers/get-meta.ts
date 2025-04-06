import { OGType } from "@/application/constants/meta";
import { SITE_NAME, SITE_ORIGIN } from "@/application/constants/site";
import type { Meta } from "@/application/interfaces/content-service";

export const getMeta = (): Meta => {
	return {
		title: SITE_NAME,
		ogTitle: SITE_NAME,
		ogType: OGType.Website,
		ogURL: SITE_ORIGIN,
		ogImage: `${SITE_ORIGIN}/og-image.png`,
	};
};
