import { css } from "@world-history-map/styled-system/css";

export const mainColumnStyle = css({
	maxW: "prose",
	mx: "auto",
	px: "4",
	py: "8",
});

export const contentColumnStyle = css({
	display: "flex",
	flexDirection: "column",
	gap: "10",
});

export const viewerLinkContainerStyle = css({
	borderRadius: "md",
	bg: "slate.50",
	_hover: {
		bg: "slate.100",
	},
});

export const viewerLinkStyle = css({
	display: "grid",
	gridTemplateColumns: "1fr 24px",
	alignItems: "center",
	w: "full",
	h: "full",
	px: "4",
	py: "6",
	color: "slate.800",
	fontSize: "lg",
	fontWeight: "medium",
	lineHeight: "relaxed",
	letterSpacing: "wider",
	cursor: "pointer",
});

export const viewerLinkTextStyle = css({
	transform: "translateX(12px)",
	textAlign: "center",
});

export const headingStyle = css({
	fontSize: "xl",
	fontWeight: "bold",
	mb: "4",
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
	display: "grid",
	gridTemplateColumns: "1fr 24px",
	gap: "4",
	alignItems: "center",
	w: "full",
	h: "full",
	p: "4",
	color: "slate.800",
	fontSize: "lg",
	fontWeight: "medium",
	lineHeight: "relaxed",
	cursor: "pointer",
});
