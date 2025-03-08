import fs from "node:fs";
import yaml from "js-yaml";
import { IYamlLoader } from "./types";

export class YamlLoader implements IYamlLoader {
	load(path: string): unknown {
		const textContent = fs.readFileSync(path, "utf-8");
		return yaml.load(textContent);
	}
}
