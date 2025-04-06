import { css } from "styled-system/css";

export const mainColumnStyle = css({
	maxW: "prose",
	mx: "auto",
	px: "4",
});

export const contentListStyle = css({
	listStyle: "inside",
});

export const contentItemStyle = css({
	fontSize: "lg",
	lineHeight: "relaxed",
});

export const contentLinkStyle = css({
	textDecoration: "underline",
	_hover: {
		textDecoration: "none",
	},
});
