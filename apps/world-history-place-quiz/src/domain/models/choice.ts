export class Choice {
	private readonly id: string;
	private readonly value: number;
	private readonly text: string;

	private constructor(id: string, value: number, text: string) {
		if (!id) {
			throw new Error("Choice id must not be empty");
		}
		if (!text) {
			throw new Error("Choice text must not be empty");
		}
		if (value < 0) {
			throw new Error("Choice value must be non-negative");
		}

		this.id = id;
		this.value = value;
		this.text = text;
	}

	static create(id: string, value: number, text: string): Choice {
		return new Choice(id, value, text);
	}

	getId(): string {
		return this.id;
	}

	getValue(): number {
		return this.value;
	}

	getText(): string {
		return this.text;
	}
}
