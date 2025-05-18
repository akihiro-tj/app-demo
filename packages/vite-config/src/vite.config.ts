import type { Plugin } from "vite";

export function baseConfig(): Plugin {
	return {
		name: "vite-config",
		config(config) {
			return {
				...config,
				server: {
					...config.server,
					fs: {
						...config.server?.fs,
						allow: ["styled-system"],
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
