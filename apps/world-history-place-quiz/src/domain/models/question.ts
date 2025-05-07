import { Choice } from "./choice";

export interface QuestionProps {
	id: string;
	statement: string;
	choices: ChoiceData[];
	correctChoice: ChoiceData;
	explanation: string;
}

interface ChoiceData {
	value: number;
	text: string;
}

export class Question {
	private readonly id: string;
	private readonly statement: string;
	private readonly choices: Choice[];
	private readonly correctChoice: Choice;
	private readonly explanation: string;

	private constructor(
		id: string,
		statement: string,
		choices: Choice[],
		correctChoice: Choice,
		explanation: string,
	) {
		if (!id) {
			throw new Error("Question id must not be empty");
		}
		if (!statement) {
			throw new Error("Question statement must not be empty");
		}
		if (choices.length === 0) {
			throw new Error("Question must have at least one choice");
		}
		if (correctChoice.getValue() >= choices.length) {
			throw new Error("Correct choice value must be within choices range");
		}
		if (!explanation) {
			throw new Error("Question explanation must not be empty");
		}

		this.id = id;
		this.statement = statement;
		this.choices = choices;
		this.correctChoice = correctChoice;
		this.explanation = explanation;
	}

	static create(props: QuestionProps): Question {
		const choices = props.choices.map((choice) =>
			Choice.create({
				id: `${props.id}-${choice.value}`,
				value: choice.value,
				text: choice.text,
			}),
		);
		const correctChoice = Choice.create({
			id: `${props.id}-${props.correctChoice.value}`,
			value: props.correctChoice.value,
			text: props.correctChoice.text,
		});
		return new Question(
			props.id,
			props.statement,
			choices,
			correctChoice,
			props.explanation,
		);
	}

	getId(): string {
		return this.id;
	}

	getStatement(): string {
		return this.statement;
	}

	getChoices(): Choice[] {
		return [...this.choices];
	}

	getCorrectChoice(): Choice {
		return this.correctChoice;
	}

	getExplanation(): string {
		return this.explanation;
	}
}
