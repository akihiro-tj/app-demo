import type { Plugin } from "vite";

export function baseConfig(): Plugin {
	return {
		name: "vite-config",
		config(config) {
			return {
				...config,
				server: {
					port: 8000,
				},
				build: {
					rollupOptions: {
						external: ["@world-history-map/styled-system"],
					},
				},
				test: {
					include: ["src/**/*.test.ts"],
					environment: "jsdom",
				},
			};
		},
	};
}
