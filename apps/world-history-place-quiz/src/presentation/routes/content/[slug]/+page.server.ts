import {
	getContent,
	getContentsEntries,
} from "@/application/services/content.js";
import type { EntryGenerator } from "./$types.js";

export function load({ params }) {
	const content = getContent(params.slug);
	return { content };
}

export const entries: EntryGenerator = () => {
	return getContentsEntries();
};
