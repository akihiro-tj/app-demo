export interface IFileLoader {
	loadYaml: (path: string) => unknown;
}
