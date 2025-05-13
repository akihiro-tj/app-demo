import type { QuestionViewModel } from "@/presentation/models/question";

interface QuizState {
	correctCount: number;
	isTotalResultVisible: boolean;
	setAnswer: (questionId: string, choiceId: string) => void;
	getQuestionState: (questionIndex: number) => QuestionState | undefined;
}

interface QuestionState {
	isVisible: boolean;
	selectedChoice: string | undefined;
	isCorrect: boolean | undefined;
}

export const useQuizState = (questions: QuestionViewModel[]): QuizState => {
	let answers = $state(new Map<string, string>());

	const currentQuestionIndex = $derived(answers.size);

	const questionStates = $derived(
		questions.map(
			(question, index): QuestionState => ({
				isVisible: index <= currentQuestionIndex,
				selectedChoice: answers.get(question.id),
				isCorrect: answers.has(question.id)
					? answers.get(question.id) === question.correctChoice.id
					: undefined,
			}),
		),
	);

	const correctCount = $derived(
		questionStates.filter((question) => question.isCorrect).length,
	);

	const isTotalResultVisible = $derived(
		currentQuestionIndex === questions.length,
	);

	return {
		get correctCount(): number {
			return correctCount;
		},
		get isTotalResultVisible(): boolean {
			return isTotalResultVisible;
		},
		setAnswer: (questionId: string, choiceId: string) => {
			const newAnswers = new Map(answers);
			newAnswers.set(questionId, choiceId);
			answers = newAnswers;
		},
		getQuestionState: (questionIndex: number): QuestionState | undefined => {
			return questionStates[questionIndex];
		},
	};
};
