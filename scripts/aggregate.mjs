import fs from "node:fs";

const APPS = ["quiz", "viewer"];
const OUTPUT_DIR_PATH = "./build";

fs.rmSync(OUTPUT_DIR_PATH, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR_PATH, { recursive: true });

const TOP_DIR_PATH = "apps/top/build";
fs.cpSync(TOP_DIR_PATH, OUTPUT_DIR_PATH, { recursive: true });

for (const app of APPS) {
	const appDirPath = `apps/${app}/build`;
	fs.cpSync(appDirPath, `${OUTPUT_DIR_PATH}/${app}`, { recursive: true });
}
