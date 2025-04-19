export interface FileLoaderOptions {
	encoding?: BufferEncoding;
	recursive?: boolean;
	filter?: (path: string) => boolean;
}

export interface IFileLoader {
	loadYaml(path: string): unknown;
	loadJson(path: string): unknown;
	readFile(path: string, options?: FileLoaderOptions): string;
	getDirNames(path: string, options?: FileLoaderOptions): string[];
	getFileNames(path: string, options?: FileLoaderOptions): string[];
	exists(path: string): boolean;

	loadYamlAsync(path: string): Promise<unknown>;
	loadJsonAsync(path: string): Promise<unknown>;
	readFileAsync(path: string, options?: FileLoaderOptions): Promise<string>;
	getDirNamesAsync(
		path: string,
		options?: FileLoaderOptions,
	): Promise<string[]>;
	getFileNamesAsync(
		path: string,
		options?: FileLoaderOptions,
	): Promise<string[]>;
	existsAsync(path: string): Promise<boolean>;
}
