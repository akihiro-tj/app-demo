import { getAllContents } from "@/usecases/content";

export async function load() {
	const contents = getAllContents();
	return { contents };
}
