import { getAllContents } from "@/application/services/content";

export async function load() {
	const contents = getAllContents();
	return { contents };
}
