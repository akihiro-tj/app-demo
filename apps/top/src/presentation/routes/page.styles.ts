import { css } from "@world-history-map/styled-system/css";

export const mainColumnStyle = css({
	maxW: "prose",
	mx: "auto",
	px: "4",
	py: "8",
});

export const contentListStyle = css({
	listStyle: "none",
	display: "grid",
	gap: "4",
	gridTemplateColumns: {
		base: "1fr",
		md: "repeat(2, 1fr)",
	},
});

export const contentItemStyle = css({
	borderRadius: "md",
	bg: "slate.50",
	_hover: {
		bg: "slate.100",
	},
});

export const contentLinkStyle = css({
	display: "block",
	w: "full",
	h: "full",
	p: "4",
	color: "slate.800",
	fontSize: "lg",
	fontWeight: "medium",
	lineHeight: "relaxed",
	cursor: "pointer",
});
