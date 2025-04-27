import { ChoiceId } from "../value-objects/choice-id";

export class Choice {
	private constructor(
		private readonly id: ChoiceId,
		private readonly value: number,
		private readonly text: string,
	) {
		if (!text) {
			throw new Error("Choice text must not be empty");
		}
		if (value < 0) {
			throw new Error("Choice value must be non-negative");
		}
	}

	static create(id: string, value: number, text: string): Choice {
		return new Choice(ChoiceId.create(id), value, text);
	}

	getId(): ChoiceId {
		return this.id;
	}

	getValue(): number {
		return this.value;
	}

	getText(): string {
		return this.text;
	}
}
