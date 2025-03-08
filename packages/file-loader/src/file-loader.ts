import fs from "node:fs";
import yaml from "js-yaml";
import type { IFileLoader } from "./types";

export class FileLoader implements IFileLoader {
	loadYaml(path: string): unknown {
		const textContent = fs.readFileSync(path, "utf-8");
		return yaml.load(textContent);
	}

	getFileNames(path: string): string[] {
		return fs.readdirSync(path);
	}
}
