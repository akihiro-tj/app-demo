export class FileLoaderError extends Error {
	public readonly operation: string;
	public readonly path: string;
	public readonly cause?: unknown;

	constructor(operation: string, path: string, cause?: unknown) {
		const message = `Failed to ${operation}: ${path}. ${cause instanceof Error ? cause.message : String(cause)}`;
		super(message);
		this.name = "FileLoaderError";
		this.operation = operation;
		this.path = path;
		this.cause = cause;
	}
}
