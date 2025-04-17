export class Choice {
	private constructor(
		private readonly text: string,
		private readonly index: number,
	) {
		if (!text) {
			throw new Error("Choice text must not be empty");
		}
		if (index < 0) {
			throw new Error("Choice index must be non-negative");
		}
	}

	static create(text: string, index: number): Choice {
		return new Choice(text, index);
	}

	getText(): string {
		return this.text;
	}

	getIndex(): number {
		return this.index;
	}
}
