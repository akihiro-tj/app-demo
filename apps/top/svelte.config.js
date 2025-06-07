import { baseConfig } from "@world-history-map/svelte-config";
import { appConfig } from "@world-history-map/app-config";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	...baseConfig,
	kit: {
		...baseConfig.kit,
		paths: {
			base: appConfig.topBasePath,
		},
		files: {
			routes: "src/presentation/routes",
		},
	},
};

export default config;
