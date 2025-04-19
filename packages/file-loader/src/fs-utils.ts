import fs from "node:fs";
import yaml from "js-yaml";
import { FsUtilsError } from "./errors";
import type { FsUtilsOptions, IFsUtils } from "./types";

export class FsUtils implements IFsUtils {
	private defaultOptions: FsUtilsOptions = {
		encoding: "utf-8",
		recursive: false,
	};

	private mergeOptions(options?: FsUtilsOptions): FsUtilsOptions {
		return { ...this.defaultOptions, ...options };
	}

	loadYaml(path: string): unknown {
		try {
			const textContent = this.readFile(path);
			return yaml.load(textContent);
		} catch (error) {
			throw new FsUtilsError("load YAML file", path, error);
		}
	}

	loadJson(path: string): unknown {
		try {
			const textContent = this.readFile(path);
			return JSON.parse(textContent);
		} catch (error) {
			throw new FsUtilsError("load JSON file", path, error);
		}
	}

	readFile(path: string, options?: FsUtilsOptions): string {
		try {
			const mergedOptions = this.mergeOptions(options);
			const content = fs.readFileSync(path, mergedOptions.encoding);
			return typeof content === "string"
				? content
				: content.toString(mergedOptions.encoding);
		} catch (error) {
			throw new FsUtilsError("read file", path, error);
		}
	}

	getDirNames(path: string, options?: FsUtilsOptions): string[] {
		try {
			const mergedOptions = this.mergeOptions(options);
			const entries = fs.readdirSync(path, { withFileTypes: true });
			const dirNames = entries
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name)
				.filter((name) => !mergedOptions.filter || mergedOptions.filter(name));

			if (mergedOptions.recursive) {
				const subDirs = dirNames.flatMap((dir) => {
					const subPath = `${path}/${dir}`;
					return this.getDirNames(subPath, mergedOptions).map(
						(name) => `${dir}/${name}`,
					);
				});
				return [...dirNames, ...subDirs];
			}

			return dirNames;
		} catch (error) {
			throw new FsUtilsError("get directory names", path, error);
		}
	}

	getFileNames(path: string, options?: FsUtilsOptions): string[] {
		try {
			const mergedOptions = this.mergeOptions(options);
			const entries = fs.readdirSync(path, { withFileTypes: true });
			const fileNames = entries
				.filter((dirent) => dirent.isFile())
				.map((dirent) => dirent.name)
				.filter((name) => !mergedOptions.filter || mergedOptions.filter(name));

			if (mergedOptions.recursive) {
				const subDirs = this.getDirNames(path, {
					...mergedOptions,
					filter: undefined,
				});
				const subFiles = subDirs.flatMap((dir) => {
					const subPath = `${path}/${dir}`;
					return this.getFileNames(subPath, mergedOptions).map(
						(name) => `${dir}/${name}`,
					);
				});
				return [...fileNames, ...subFiles];
			}

			return fileNames;
		} catch (error) {
			throw new FsUtilsError("get file names", path, error);
		}
	}

	exists(path: string): boolean {
		return fs.existsSync(path);
	}

	async loadYamlAsync(path: string): Promise<unknown> {
		try {
			const textContent = await this.readFileAsync(path);
			return yaml.load(textContent);
		} catch (error) {
			throw new FsUtilsError("load YAML file", path, error);
		}
	}

	async loadJsonAsync(path: string): Promise<unknown> {
		try {
			const textContent = await this.readFileAsync(path);
			return JSON.parse(textContent);
		} catch (error) {
			throw new FsUtilsError("load JSON file", path, error);
		}
	}

	async readFileAsync(path: string, options?: FsUtilsOptions): Promise<string> {
		try {
			const mergedOptions = this.mergeOptions(options);
			const content = await fs.promises.readFile(path, mergedOptions.encoding);
			return typeof content === "string"
				? content
				: content.toString(mergedOptions.encoding);
		} catch (error) {
			throw new FsUtilsError("read file", path, error);
		}
	}

	async getDirNamesAsync(
		path: string,
		options?: FsUtilsOptions,
	): Promise<string[]> {
		try {
			const mergedOptions = this.mergeOptions(options);
			const entries = await fs.promises.readdir(path, { withFileTypes: true });
			const dirNames = entries
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name)
				.filter((name) => !mergedOptions.filter || mergedOptions.filter(name));

			if (mergedOptions.recursive) {
				const subDirs = await Promise.all(
					dirNames.map(async (dir) => {
						const subPath = `${path}/${dir}`;
						const subDirNames = await this.getDirNamesAsync(
							subPath,
							mergedOptions,
						);
						return subDirNames.map((name) => `${dir}/${name}`);
					}),
				);
				return [...dirNames, ...subDirs.flat()];
			}

			return dirNames;
		} catch (error) {
			throw new FsUtilsError("get directory names", path, error);
		}
	}

	async getFileNamesAsync(
		path: string,
		options?: FsUtilsOptions,
	): Promise<string[]> {
		try {
			const mergedOptions = this.mergeOptions(options);
			const entries = await fs.promises.readdir(path, { withFileTypes: true });
			const fileNames = entries
				.filter((dirent) => dirent.isFile())
				.map((dirent) => dirent.name)
				.filter((name) => !mergedOptions.filter || mergedOptions.filter(name));

			if (mergedOptions.recursive) {
				const subDirs = await this.getDirNamesAsync(path, {
					...mergedOptions,
					filter: undefined,
				});
				const subFiles = await Promise.all(
					subDirs.map(async (dir) => {
						const subPath = `${path}/${dir}`;
						const subFileNames = await this.getFileNamesAsync(
							subPath,
							mergedOptions,
						);
						return subFileNames.map((name) => `${dir}/${name}`);
					}),
				);
				return [...fileNames, ...subFiles.flat()];
			}

			return fileNames;
		} catch (error) {
			throw new FsUtilsError("get file names", path, error);
		}
	}

	async existsAsync(path: string): Promise<boolean> {
		try {
			await fs.promises.access(path);
			return true;
		} catch {
			return false;
		}
	}
}
