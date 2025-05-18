import { baseConfig } from "@world-history-map/svelte-config";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	...baseConfig,
	kit: {
		...baseConfig.kit,
		paths: {
			base: "/viewer",
		},
	},
};

export default config;
