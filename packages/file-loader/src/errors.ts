export class FsUtilsError extends Error {
	constructor(operation: string, path: string, cause?: unknown) {
		super(
			`Failed to ${operation}: ${path}. ${
				cause instanceof Error ? cause.message : String(cause)
			}`,
		);
		this.name = "FsUtilsError";
	}
}
