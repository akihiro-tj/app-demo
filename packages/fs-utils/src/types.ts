export interface FsUtilsOptions {
	encoding?: BufferEncoding;
	recursive?: boolean;
	filter?: (path: string) => boolean;
}

export interface IFsUtils {
	loadYaml(path: string): unknown;
	loadJson(path: string): unknown;
	readFile(path: string, options?: FsUtilsOptions): string;
	getDirNames(path: string, options?: FsUtilsOptions): string[];
	getFileNames(path: string, options?: FsUtilsOptions): string[];
	exists(path: string): boolean;

	loadYamlAsync(path: string): Promise<unknown>;
	loadJsonAsync(path: string): Promise<unknown>;
	readFileAsync(path: string, options?: FsUtilsOptions): Promise<string>;
	getDirNamesAsync(path: string, options?: FsUtilsOptions): Promise<string[]>;
	getFileNamesAsync(path: string, options?: FsUtilsOptions): Promise<string[]>;
	existsAsync(path: string): Promise<boolean>;
}
