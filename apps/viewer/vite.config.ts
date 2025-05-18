import { baseConfig } from "@world-history-map/vite-config";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit(), baseConfig()],
});
