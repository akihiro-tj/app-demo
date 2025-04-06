import { container } from "@/config/container";

export async function load() {
	const contents = container.createContentService().getAllContents();
	return { contents };
}
