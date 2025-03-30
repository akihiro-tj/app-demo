import fs from "node:fs";
import yaml from "js-yaml";
import type { IFileLoader } from "./types";

export class FileLoader implements IFileLoader {
	loadYaml(path: string): unknown {
		const textContent = fs.readFileSync(path, "utf-8");
		return yaml.load(textContent);
	}

	getDirNames(path: string): string[] {
		return fs
			.readdirSync(path, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
	}
}
