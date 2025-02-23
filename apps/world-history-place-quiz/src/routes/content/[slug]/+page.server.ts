import { contents } from "../../data";
import type { EntryGenerator } from "./$types.js";

export function load({ params }) {
	const content = contents.find((content) => content.slug === params.slug);

	return {
		content,
	};
}

export const entries: EntryGenerator = () => {
	return contents.map((content) => ({
		slug: content.slug,
	}));
};
