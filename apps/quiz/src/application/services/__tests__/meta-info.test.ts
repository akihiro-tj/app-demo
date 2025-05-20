import { base } from "$app/paths";
import { OGType } from "@/application/constants/meta-info";
import { appConfig } from "@world-history-map/app-config";
import { describe, expect, it } from "vitest";
import { generateMetaInfo } from "../meta-info";

const baseUrl = `${appConfig.origin}${base}`;

describe("generateMetaInfo", () => {
	it("should generate meta info for top page when no options are provided", () => {
		const result = generateMetaInfo();

		expect(result).toEqual({
			title: appConfig.name,
			ogTitle: appConfig.name,
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
			title: `${title} | ${appConfig.name}`,
			ogTitle: `${title} | ${appConfig.name}`,
			ogType: OGType.Article,
			ogURL: `${baseUrl}${path}`,
			ogImage: `${baseUrl}${path}/og-image.png`,
		});
	});
});
