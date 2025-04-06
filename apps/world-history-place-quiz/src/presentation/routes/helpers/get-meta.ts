import { OGType } from "@/application/constants/meta";
import type { Meta } from "@/application/interfaces/content-service";
import { SITE_NAME, SITE_ORIGIN } from "../constant";

export const getMeta = (): Meta => {
	return {
		title: SITE_NAME,
		ogTitle: SITE_NAME,
		ogType: OGType.Website,
		ogURL: SITE_ORIGIN,
		ogImage: `${SITE_ORIGIN}/og-image.png`,
	};
};
