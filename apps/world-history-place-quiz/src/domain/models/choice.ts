export interface ChoiceProps {
	id: string;
	text: string;
}

export class Choice {
	private readonly id: string;
	private readonly text: string;

	private constructor(id: string, text: string) {
		if (!id) {
			throw new Error("Choice id must not be empty");
		}
		if (!text) {
			throw new Error("Choice text must not be empty");
		}

		this.id = id;
		this.text = text;
	}

	static create(props: ChoiceProps): Choice {
		return new Choice(props.id, props.text);
	}

	getId(): string {
		return this.id;
	}

	getText(): string {
		return this.text;
	}
}
