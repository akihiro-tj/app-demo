import { base } from "$app/paths";
import { OGType } from "@/application/constants/meta-info";
import { SITE_NAME, SITE_ORIGIN } from "@/application/constants/site";
import { describe, expect, it } from "vitest";
import { generateMetaInfo } from "../meta-info";

const baseUrl = `${SITE_ORIGIN}${base}`;

describe("generateMetaInfo", () => {
	it("should generate meta info for top page when no options are provided", () => {
		const result = generateMetaInfo();

		expect(result).toEqual({
			title: SITE_NAME,
			ogTitle: SITE_NAME,
			ogType: OGType.Website,
			ogURL: baseUrl,
			ogImage: `${baseUrl}/og-image.png`,
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
			ogURL: `${baseUrl}${path}`,
			ogImage: `${baseUrl}${path}/og-image.png`,
		});
	});
});
