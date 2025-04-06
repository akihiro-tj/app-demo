import { container } from "@/config/container.js";
import type { EntryGenerator } from "./$types.js";

export function load({ params }) {
	const content = container.createContentService().getContent(params.slug);
	return { content };
}

export const entries: EntryGenerator = () => {
	return container.createContentService().getContentsEntries();
};
