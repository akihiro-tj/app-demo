import { css, cva } from "styled-system/css";

export const mainColumnStyle = css({
	maxW: "prose",
	mx: "auto",
	px: "4",
	py: "6",
});

export const titleContainerStyle = css({
	mb: "8",
});

export const titleStyle = css({
	fontSize: "3xl",
	fontWeight: "bold",
	lineHeight: "tight",
	letterSpacing: "tight",
});

export const questionStyle = cva({
	base: {
		mb: "16",
		pb: "8",
	},
	variants: {
		showBorder: {
			true: {
				borderBottomWidth: "1px",
				borderBottomStyle: "solid",
				borderColor: "slate.200",
			},
			false: {},
		},
	},
});

export const headingContainerStyle = css({
	mb: "4",
});

export const headingStyle = css({
	display: "flex",
	alignItems: "baseline",
	gap: "2",
});

export const questionNumberStyle = css({
	fontSize: "2xl",
	fontWeight: "bold",
	color: "slate.700",
	letterSpacing: "tight",
});

export const questionCountStyle = css({
	fontSize: "lg",
	fontWeight: "medium",
	color: "slate.500",
});

export const statementContainerStyle = css({
	mb: "6",
	fontSize: "lg",
	lineHeight: "relaxed",
	color: "slate.800",
});

export const imageContainerStyle = css({
	mb: "6",
	aspectRatio: "4/3",
});

export const choiceListContainerStyle = css({
	mb: "6",
});

export const resultTextContainerStyle = css({
	mb: "4",
	mt: "4",
});

export const resultTextStyle = cva({
	base: {
		fontSize: "2xl",
		fontWeight: "bold",
		letterSpacing: "tight",
	},
	variants: {
		isCorrect: {
			true: {
				color: "emerald.500",
			},
			false: {
				color: "rose.500",
			},
		},
	},
});

export const totalResultStyle = css({
	my: "16",
	p: "6",
	bg: "slate.50",
	borderRadius: "lg",
});

export const totalResultContainerStyle = css({
	display: "flex",
	gap: "3",
	alignItems: "baseline",
});

export const totalResultValueStyle = css({
	fontSize: "3xl",
	fontWeight: "bold",
	color: "slate.800",
	letterSpacing: "tight",
});

export const topPageLinkContainerStyle = css({
	display: "flex",
	justifyContent: "center",
	mb: "16",
});

export const topPageLinkStyle = css({
	px: "6",
	py: "3",
	bg: "slate.50",
	borderRadius: "md",
	color: "slate.700",
	fontWeight: "medium",
	_hover: {
		bg: "slate.100",
	},
});
