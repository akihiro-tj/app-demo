import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FsUtils } from "../fs-utils";

describe("FsUtils", () => {
	const testDir = path.join(__dirname, "test-files");
	const dataDir = path.join(__dirname, "fixtures", "data");
	let fsUtils: FsUtils;

	beforeEach(() => {
		fsUtils = new FsUtils();

		if (!fs.existsSync(testDir)) {
			fs.mkdirSync(testDir);
		}

		const jsonPath = path.join(testDir, "test.json");
		const yamlPath = path.join(testDir, "test.yaml");

		fs.copyFileSync(path.join(dataDir, "test.json"), jsonPath);
		fs.copyFileSync(path.join(dataDir, "test.yaml"), yamlPath);
	});

	afterEach(() => {
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true, force: true });
		}
	});

	describe("Synchronous Methods", () => {
		describe("loadJson", () => {
			it("should load and parse JSON file", () => {
				const result = fsUtils.loadJson(path.join(testDir, "test.json"));
				expect(result).toEqual({
					test: "data",
					nested: {
						key: "value",
						array: [1, 2, 3],
					},
					boolean: true,
					number: 42,
				});
			});

			it("should throw error for non-existent JSON file", () => {
				expect(() => {
					fsUtils.loadJson(path.join(testDir, "non-existent.json"));
				}).toThrow();
			});
		});

		describe("loadYaml", () => {
			it("should load and parse YAML file", () => {
				const result = fsUtils.loadYaml(path.join(testDir, "test.yaml"));
				expect(result).toEqual({
					test: "data",
					nested: {
						key: "value",
						array: [1, 2, 3],
					},
					boolean: true,
					number: 42,
				});
			});

			it("should throw error for non-existent YAML file", () => {
				expect(() => {
					fsUtils.loadYaml(path.join(testDir, "non-existent.yaml"));
				}).toThrow();
			});
		});

		describe("readFile", () => {
			it("should read file content", () => {
				const content = fsUtils.readFile(path.join(testDir, "test.json"));
				expect(content).toContain('"test": "data"');
				expect(content).toContain('"nested"');
				expect(content).toContain('"array": [1, 2, 3]');
			});

			it("should handle Buffer content", () => {
				const content = fsUtils.readFile(path.join(testDir, "test.json"), {
					encoding: "binary",
				});
				expect(Buffer.isBuffer(content)).toBe(false);
				expect(typeof content).toBe("string");
			});

			it("should handle Buffer content with toString", () => {
				const content = fsUtils.readFile(path.join(testDir, "test.json"), {
					encoding: "ascii",
				});
				expect(typeof content).toBe("string");
				expect(content).toContain('"test": "data"');
			});

			it("should throw error for non-existent file", () => {
				expect(() => {
					fsUtils.readFile(path.join(testDir, "non-existent.txt"));
				}).toThrow();
			});
		});

		describe("getDirNames", () => {
			it("should get directory names", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = fsUtils.getDirNames(targetDirsPath);
				expect(dirNames).toContain("dir1");
				expect(dirNames).toContain("dir2");
				expect(dirNames).toContain("dir3");
			});

			it("should get directory names recursively", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = fsUtils.getDirNames(targetDirsPath, {
					recursive: true,
				});
				expect(dirNames).toContain("dir1");
				expect(dirNames).toContain("dir2");
				expect(dirNames).toContain("dir3");
				expect(dirNames).toContain("dir1/subdir1");
				expect(dirNames).toContain("dir2/subdir2");
			});

			it("should get directory names with filter", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = fsUtils.getDirNames(targetDirsPath, {
					filter: (name) => name.includes("1"),
				});
				expect(dirNames).toContain("dir1");
				expect(dirNames).not.toContain("dir2");
				expect(dirNames).not.toContain("dir3");
			});

			it("should get directory names recursively with filter", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = fsUtils.getDirNames(targetDirsPath, {
					recursive: true,
					filter: (name) => name.includes("1"),
				});
				expect(dirNames).toContain("dir1");
				expect(dirNames).toContain("dir1/subdir1");
				expect(dirNames).not.toContain("dir2");
				expect(dirNames).not.toContain("dir2/subdir2");
			});

			it("should throw error for non-existent directory", () => {
				expect(() => {
					fsUtils.getDirNames(path.join(testDir, "non-existent"));
				}).toThrow();
			});
		});

		describe("getFileNames", () => {
			it("should get file names", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = fsUtils.getFileNames(
					path.join(targetDirsPath, "dir1"),
				);
				expect(fileNames).toContain("file1.txt");
			});

			it("should get file names recursively", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = fsUtils.getFileNames(targetDirsPath, {
					recursive: true,
				});
				expect(fileNames).toContain("test.json");
				expect(fileNames).toContain("test.yaml");
				expect(fileNames).toContain("dir1/file1.txt");
				expect(fileNames).toContain("dir2/file2.txt");
				expect(fileNames).toContain("dir3/file3.txt");
				expect(fileNames).toContain("dir1/subdir1/file3.txt");
				expect(fileNames).toContain("dir2/subdir2/file4.txt");
			});

			it("should get file names with filter", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = fsUtils.getFileNames(targetDirsPath, {
					filter: (name) => name.endsWith(".json"),
				});
				expect(fileNames).toContain("test.json");
				expect(fileNames).not.toContain("test.yaml");
			});

			it("should get file names recursively with filter", () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = fsUtils.getFileNames(targetDirsPath, {
					recursive: true,
					filter: (name) => name.includes("file1"),
				});
				expect(fileNames).not.toContain("test.json");
				expect(fileNames).not.toContain("test.yaml");
				expect(fileNames).toContain("dir1/file1.txt");
				expect(fileNames).not.toContain("dir2/file2.txt");
			});

			it("should throw error for non-existent directory", () => {
				expect(() => {
					fsUtils.getFileNames(path.join(testDir, "non-existent"));
				}).toThrow();
			});
		});

		describe("exists", () => {
			it("should return true for existing file", () => {
				expect(fsUtils.exists(path.join(testDir, "test.json"))).toBe(true);
			});

			it("should return false for non-existent file", () => {
				expect(fsUtils.exists(path.join(testDir, "non-existent.txt"))).toBe(
					false,
				);
			});
		});
	});

	describe("Asynchronous Methods", () => {
		describe("loadJsonAsync", () => {
			it("should load and parse JSON file asynchronously", async () => {
				const result = await fsUtils.loadJsonAsync(
					path.join(testDir, "test.json"),
				);
				expect(result).toEqual({
					test: "data",
					nested: {
						key: "value",
						array: [1, 2, 3],
					},
					boolean: true,
					number: 42,
				});
			});

			it("should throw error for non-existent JSON file", async () => {
				await expect(
					fsUtils.loadJsonAsync(path.join(testDir, "non-existent.json")),
				).rejects.toThrow();
			});
		});

		describe("loadYamlAsync", () => {
			it("should load and parse YAML file asynchronously", async () => {
				const result = await fsUtils.loadYamlAsync(
					path.join(testDir, "test.yaml"),
				);
				expect(result).toEqual({
					test: "data",
					nested: {
						key: "value",
						array: [1, 2, 3],
					},
					boolean: true,
					number: 42,
				});
			});

			it("should throw error for non-existent YAML file", async () => {
				await expect(
					fsUtils.loadYamlAsync(path.join(testDir, "non-existent.yaml")),
				).rejects.toThrow();
			});
		});

		describe("readFileAsync", () => {
			it("should read file content asynchronously", async () => {
				const content = await fsUtils.readFileAsync(
					path.join(testDir, "test.json"),
				);
				expect(content).toContain('"test": "data"');
				expect(content).toContain('"nested"');
				expect(content).toContain('"array": [1, 2, 3]');
			});

			it("should handle Buffer content asynchronously", async () => {
				const content = await fsUtils.readFileAsync(
					path.join(testDir, "test.json"),
					{
						encoding: "binary",
					},
				);
				expect(Buffer.isBuffer(content)).toBe(false);
				expect(typeof content).toBe("string");
			});

			it("should handle Buffer content with toString asynchronously", async () => {
				const content = await fsUtils.readFileAsync(
					path.join(testDir, "test.json"),
					{
						encoding: "ascii",
					},
				);
				expect(typeof content).toBe("string");
				expect(content).toContain('"test": "data"');
			});

			it("should throw error for non-existent file", async () => {
				await expect(
					fsUtils.readFileAsync(path.join(testDir, "non-existent.txt")),
				).rejects.toThrow();
			});
		});

		describe("getDirNamesAsync", () => {
			it("should get directory names asynchronously", async () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = await fsUtils.getDirNamesAsync(targetDirsPath);
				expect(dirNames).toContain("dir1");
				expect(dirNames).toContain("dir2");
				expect(dirNames).toContain("dir3");
			});

			it("should get directory names recursively asynchronously", async () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const dirNames = await fsUtils.getDirNamesAsync(targetDirsPath, {
					recursive: true,
				});
				expect(dirNames).toContain("dir1");
				expect(dirNames).toContain("dir2");
				expect(dirNames).toContain("dir3");
				expect(dirNames).toContain("dir1/subdir1");
				expect(dirNames).toContain("dir2/subdir2");
			});

			it("should throw error for non-existent directory", async () => {
				await expect(
					fsUtils.getDirNamesAsync(path.join(testDir, "non-existent")),
				).rejects.toThrow();
			});
		});

		describe("getFileNamesAsync", () => {
			it("should get file names asynchronously", async () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = await fsUtils.getFileNamesAsync(
					path.join(targetDirsPath, "dir1"),
				);
				expect(fileNames).toContain("file1.txt");
			});

			it("should get file names recursively asynchronously", async () => {
				const targetDirsPath = path.join(testDir, "data");

				fs.cpSync(dataDir, targetDirsPath, { recursive: true });

				const fileNames = await fsUtils.getFileNamesAsync(targetDirsPath, {
					recursive: true,
				});
				expect(fileNames).toContain("test.json");
				expect(fileNames).toContain("test.yaml");
				expect(fileNames).toContain("dir1/file1.txt");
				expect(fileNames).toContain("dir2/file2.txt");
				expect(fileNames).toContain("dir3/file3.txt");
				expect(fileNames).toContain("dir1/subdir1/file3.txt");
				expect(fileNames).toContain("dir2/subdir2/file4.txt");
			});

			it("should throw error for non-existent directory", async () => {
				await expect(
					fsUtils.getFileNamesAsync(path.join(testDir, "non-existent")),
				).rejects.toThrow();
			});
		});

		describe("existsAsync", () => {
			it("should return true for existing file", async () => {
				const exists = await fsUtils.existsAsync(
					path.join(testDir, "test.json"),
				);
				expect(exists).toBe(true);
			});

			it("should return false for non-existent file", async () => {
				const exists = await fsUtils.existsAsync(
					path.join(testDir, "non-existent.txt"),
				);
				expect(exists).toBe(false);
			});
		});
	});
});
