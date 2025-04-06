import { getAllContents } from "@/application/use-cases/content";

export async function load() {
	const contents = getAllContents();
	return { contents };
}
