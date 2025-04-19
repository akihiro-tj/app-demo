import { describe, expect, it } from "vitest";
import { FsUtilsError } from "../errors";

describe("FsUtilsError", () => {
	it("should create error with Error cause", () => {
		const cause = new Error("Test error");
		const error = new FsUtilsError("test operation", "test/path", cause);
		expect(error.message).toContain("Test error");
	});

	it("should create error with non-Error cause", () => {
		const cause = "string error";
		const error = new FsUtilsError("test operation", "test/path", cause);
		expect(error.message).toContain("string error");
	});

	it("should create error without cause", () => {
		const error = new FsUtilsError("test operation", "test/path");
		expect(error.message).toContain("test operation");
		expect(error.message).toContain("test/path");
		expect(error.cause).toBeUndefined();
	});
});
