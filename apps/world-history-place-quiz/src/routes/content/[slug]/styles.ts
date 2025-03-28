import { css, cva } from "styled-system/css";

export const columnStyle = css({
	maxW: "prose",
	mx: "auto",
	px: "4",
});

export const questionStyle = css({
	mb: "12",
});

export const headingContainerStyle = css({
	mb: "2",
});

export const headingStyle = css({
	display: "flex",
	alignItems: "baseline",
	gap: "2",
});

export const questionNumberStyle = css({
	fontSize: "3xl",
	fontWeight: "bold",
});

export const questionCountStyle = css({
	fontSize: "xl",
	fontWeight: "bold",
});

export const statementContainerStyle = css({
	mb: "4",
});

export const imageContainerStyle = css({
	mb: "4",
	aspectRatio: "4/3",
});

export const choiceListContainerStyle = css({
	mb: "4",
});

export const resultTextContainerStyle = css({
	mb: "2",
});

export const resultTextStyle = cva({
	base: {
		fontSize: "2xl",
		fontWeight: "bold",
	},
	variants: {
		isCorrect: {
			true: {
				color: "emerald.400",
			},
			false: {
				color: "rose.400",
			},
		},
	},
});

export const totalResultStyle = css({
	mb: "12",
});

export const totalResultContainerStyle = css({
	display: "flex",
	gap: "3",
	alignItems: "baseline",
});

export const totalResultValueStyle = css({
	fontSize: "2xl",
	fontWeight: "bold",
});
