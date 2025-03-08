import fs from "node:fs";
import yaml from "js-yaml";
import { IFileLoader } from "./types";

export class FileLoader implements IFileLoader {
	load(path: string): unknown {
		const textContent = fs.readFileSync(path, "utf-8");
		return yaml.load(textContent);
	}
}
