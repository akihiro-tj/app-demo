import { describe, it, expect } from "vitest";
import { FileLoaderError } from "../errors";

describe("FileLoaderError", () => {
	it("should create error with Error cause", () => {
		const cause = new Error("Test error");
		const error = new FileLoaderError("test operation", "test/path", cause);
		expect(error.message).toContain("Test error");
		expect(error.operation).toBe("test operation");
		expect(error.path).toBe("test/path");
		expect(error.cause).toBe(cause);
	});

	it("should create error with non-Error cause", () => {
		const cause = "string error";
		const error = new FileLoaderError("test operation", "test/path", cause);
		expect(error.message).toContain("string error");
		expect(error.operation).toBe("test operation");
		expect(error.path).toBe("test/path");
		expect(error.cause).toBe(cause);
	});

	it("should create error without cause", () => {
		const error = new FileLoaderError("test operation", "test/path");
		expect(error.message).toContain("test operation");
		expect(error.message).toContain("test/path");
		expect(error.operation).toBe("test operation");
		expect(error.path).toBe("test/path");
		expect(error.cause).toBeUndefined();
	});
});
