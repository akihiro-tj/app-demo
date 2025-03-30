export interface IFileLoader {
	loadYaml: (path: string) => unknown;
	getDirNames: (path: string) => string[];
}
