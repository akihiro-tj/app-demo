import { describe, expect, it } from "vitest";
import { hexToRgb } from "../hex-to-rgb";

describe("hexToRgb", () => {
	it("should convert hex to rgb", () => {
		expect(hexToRgb("#f1f5f9")).toEqual([241, 245, 249]);
	});
});
