export class ContentId {
	private constructor(private readonly value: string) {
		if (!value) {
			throw new Error("ContentId must not be empty");
		}
	}

	static create(value: string): ContentId {
		return new ContentId(value);
	}

	getValue(): string {
		return this.value;
	}
}
