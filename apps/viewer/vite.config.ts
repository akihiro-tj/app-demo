import { worldHistoryMap } from "@app-demo/vite-config";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit(), worldHistoryMap()],
});
