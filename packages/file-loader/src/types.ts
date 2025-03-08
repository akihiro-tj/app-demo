export interface IFileLoader {
	loadYaml: (path: string) => unknown;
	getFileNames: (path: string) => string[];
}
