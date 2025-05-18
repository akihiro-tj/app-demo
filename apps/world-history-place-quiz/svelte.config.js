import { baseConfig } from "@app-demo/svelte-config";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	...baseConfig,
	kit: {
		...baseConfig.kit,
		files: {
			routes: "src/presentation/routes",
		},
	},
};

export default config;
