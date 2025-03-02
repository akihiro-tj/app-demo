import type { Question } from "@/entities/question";

type Content = {
	slug: string;
	title: string;
	questions: Question[];
};

export const contents: Content[] = [
	{
		slug: "hoge",
		title: "Hoge",
		questions: [
			{
				statement: "Hoge?",
				image: "/contents/hoge/q1.png",
				choices: ["Hoge", "Fuga", "Piyo"],
				correctChoice: {
					value: 1,
					text: "Fuga",
				},
				explanation: "Fuga is correct.",
			},
			{
				statement:
					"問題文が入ります問題文が入ります問題文が入ります問題文が入ります問題文が入ります",
				image: "/contents/hoge/q1.png",
				choices: ["選択肢", "選択肢", "選択肢"],
				correctChoice: {
					value: 2,
					text: "選択肢",
				},
				explanation: "選択肢 is correct.",
			},
		],
	},
	{
		slug: "fuga",
		title: "Fuga",
		questions: [
			{
				statement: "Hoge?",
				image: "/contents/hoge/q1.png",
				choices: ["Hoge", "Fuga", "Piyo"],
				correctChoice: {
					value: 1,
					text: "Fuga",
				},
				explanation: "Fuga is correct.",
			},
			{
				statement: "Fuga?",
				image: "/contents/hoge/q1.png",
				choices: ["Hoge", "Fuga", "Piyo"],
				correctChoice: {
					value: 2,
					text: "Piyo",
				},
				explanation: "Piyo is correct.",
			},
		],
	},
];
