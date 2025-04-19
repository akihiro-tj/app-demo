export class ChoiceId {
	private constructor(private readonly value: string) {
		if (!value) {
			throw new Error("ChoiceId must not be empty");
		}
	}

	static create(value: string): ChoiceId {
		return new ChoiceId(value);
	}

	getValue(): string {
		return this.value;
	}
}
