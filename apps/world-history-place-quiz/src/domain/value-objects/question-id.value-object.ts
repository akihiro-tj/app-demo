export class QuestionId {
	private constructor(private readonly value: string) {
		if (!value) {
			throw new Error("QuestionId must not be empty");
		}
	}

	static create(value: string): QuestionId {
		return new QuestionId(value);
	}

	getValue(): string {
		return this.value;
	}
}
