import { OGType } from "@/application/constants/meta-info";
import { SITE_NAME, SITE_ORIGIN } from "@/application/constants/site";
import { describe, expect, it } from "vitest";
import { generateMetaInfo } from "../meta-info";

describe("generateMetaInfo", () => {
	it("should generate meta info for top page when no options are provided", () => {
		const result = generateMetaInfo();

		expect(result).toEqual({
			title: SITE_NAME,
			ogTitle: SITE_NAME,
			ogType: OGType.Website,
			ogURL: SITE_ORIGIN,
			ogImage: `${SITE_ORIGIN}/og-image.png`,
		});
	});

	it("should generate meta info for article page when title and path are provided", () => {
		const title = "Test Article";
		const path = "/articles/test";
		const result = generateMetaInfo({ title, path });

		expect(result).toEqual({
			title: `${title} | ${SITE_NAME}`,
			ogTitle: `${title} | ${SITE_NAME}`,
			ogType: OGType.Article,
			ogURL: `${SITE_ORIGIN}${path}`,
			ogImage: `${SITE_ORIGIN}${path}/og-image.png`,
		});
	});
});
