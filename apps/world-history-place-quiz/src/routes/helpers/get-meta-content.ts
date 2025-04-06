import { OGType } from "@/application/constants/meta-content";
import type { MetaContent } from "../../application/interfaces/meta-content";
import { SITE_NAME, SITE_ORIGIN } from "../constant";

export const getMetaContent = (): MetaContent => {
	return {
		title: SITE_NAME,
		ogTitle: SITE_NAME,
		ogType: OGType.Website,
		ogURL: SITE_ORIGIN,
		ogImage: `${SITE_ORIGIN}/og-image.png`,
	};
};
