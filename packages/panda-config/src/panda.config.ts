import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
	html: {
		"--global-font-body": "Inter Variable, Noto Sans JP Variable, sans-serif",
		color: "slate.900",
	},
});

export const pandaConfig = defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./src/**/*.{js,ts,svelte}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	// The output directory for your css system
	outdir: "styled-system",

	globalCss,
});
