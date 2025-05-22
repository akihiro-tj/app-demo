import { type Config, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
	html: {
		"--global-font-body": "Inter Variable, Noto Sans JP Variable, sans-serif",
		color: "slate.900",
	},
});

export const baseConfig: Config = {
	// Whether to use css reset
	preflight: true,

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	globalCss,

	// Where to look for your css declarations
	// https://panda-css.com/docs/guides/component-library#include-the-src-files
	include: [
		"./node_modules/@world-history-map/ui/dist/**/*.{js,ts,svelte}",
		"./src/**/*.{js,ts,svelte}",
	],
	importMap: "@world-history-map/styled-system",
};
