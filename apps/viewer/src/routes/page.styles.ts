import { css, cva } from "styled-system/css";

export const mainColumnStyle = css({
	position: "relative",
	w: "full",
	h: "calc(100dvh - 64px)", // TODO: Make this dynamic
});

export const canvasStyle = css({
	w: "full",
	h: "full",
	bg: "slate.400",
});

export const sidePanelStyle = cva({
	base: {
		transitionProperty: "all",
		transitionDuration: "normal",
		transitionTimingFunction: "ease-in-out",
		position: "absolute",
		top: "4",
		w: "80",
		h: "80",
		p: "4",
		bg: "white",
		borderRadius: "md",
		boxShadow: "md",
	},
	variants: {
		visible: {
			true: {
				left: "4",
			},
			false: {
				left: "-100%",
			},
		},
	},
});

export const sidePanelCloseButtonContainerStyle = css({
	display: "flex",
	justifyContent: "flex-end",
});

export const sidePanelCloseButtonStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	w: "9",
	h: "9",
	cursor: "pointer",
});

export const filterPanelOpenButtonStyle = css({
	position: "absolute",
	bottom: "4",
	left: "4",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	w: "12",
	h: "12",
	bg: "white",
	borderRadius: "full",
	boxShadow: "md",
	cursor: "pointer",
});

export const filterGroupContainerStyle = css({
	mb: "3",
});

export const filterGroupHeadingContainerStyle = css({
	mb: "1",
});

export const filterGroupHeadingStyle = css({
	fontSize: "xl",
	fontWeight: "bold",
});

export const filterContainerStyle = css({
	display: "flex",
	flexWrap: "wrap",
	columnGap: "4",
	rowGap: "1",
});

export const filterLabelStyle = css({
	fontSize: "lg",
	userSelect: "none",
	cursor: "pointer",
});

export const filterInputStyle = css({
	cursor: "pointer",
});

export const infoPanelHeadingContainerStyle = css({
	mb: "1",
});

export const infoPanelHeadingStyle = css({
	fontSize: "xl",
	fontWeight: "bold",
});
