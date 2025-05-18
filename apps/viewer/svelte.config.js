import { baseConfig } from "@app-demo/svelte-config";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	baseConfig,
	kit: {
		...baseConfig.kit,
		paths: {
			base: "/viewer",
		},
	},
};

export default config;
