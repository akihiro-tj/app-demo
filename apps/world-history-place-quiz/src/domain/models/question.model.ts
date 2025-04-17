import { Choice } from "../value-objects/choice.value-object";
import { QuestionId } from "../value-objects/question-id.value-object";

export class Question {
	private constructor(
		private readonly id: QuestionId,
		private readonly statement: string,
		private readonly choices: Choice[],
		private readonly correctChoice: Choice,
		private readonly explanation: string,
	) {
		if (!statement) {
			throw new Error("Question statement must not be empty");
		}
		if (choices.length === 0) {
			throw new Error("Question must have at least one choice");
		}
		if (correctChoice.getIndex() >= choices.length) {
			throw new Error("Correct choice index must be within choices range");
		}
		if (!explanation) {
			throw new Error("Question explanation must not be empty");
		}
	}

	static create(
		id: string,
		statement: string,
		choices: string[],
		correctChoice: number,
		explanation: string,
	): Question {
		return new Question(
			QuestionId.create(id),
			statement,
			choices.map(Choice.create),
			Choice.create(choices[correctChoice] ?? "", correctChoice),
			explanation,
		);
	}

	getId(): QuestionId {
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
