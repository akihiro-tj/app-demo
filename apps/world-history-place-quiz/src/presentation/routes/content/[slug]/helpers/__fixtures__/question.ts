import type { QuestionViewModel } from "@/presentation/models/question";

export const mockQuestions: QuestionViewModel[] = [
	{
		id: "q1",
		statement: "Question 1",
		choices: [
			{ id: "q1-0", text: "A" },
			{ id: "q1-1", text: "B" },
		],
		correctChoice: { id: "q1-1", text: "B" },
		explanation: "Explanation 1",
		imagePath: "/content/q1.png",
	},
	{
		id: "q2",
		statement: "Question 2",
		choices: [
			{ id: "q2-0", text: "A" },
			{ id: "q2-1", text: "B" },
			{ id: "q2-2", text: "C" },
		],
		correctChoice: { id: "q2-2", text: "C" },
		explanation: "Explanation 2",
		imagePath: "/content/q2.png",
	},
	{
		id: "q3",
		statement: "Question 3",
		choices: [
			{ id: "q3-0", text: "A" },
			{ id: "q3-1", text: "B" },
			{ id: "q3-2", text: "C" },
		],
		correctChoice: { id: "q3-2", text: "C" },
		explanation: "Explanation 3",
		imagePath: "/content/q3.png",
	},
];
