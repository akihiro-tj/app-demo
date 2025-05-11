import { css, cva } from "styled-system/css";

export const mainColumnStyle = css({
	position: "relative",
	w: "full",
	h: "calc(100vh - 64px)", // TODO: Make this dynamic
});

export const canvasStyle = css({
	w: "full",
	h: "full",
	bg: "slate.400",
});

export const filterContainerStyle = cva({
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

export const filterCloseButtonContainerStyle = css({
	display: "flex",
	justifyContent: "flex-end",
});

export const filterCloseButtonStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	w: "10",
	h: "10",
	cursor: "pointer",
});

export const filterOpenButtonStyle = css({
	position: "absolute",
	bottom: "4",
	right: "4",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	w: "12",
	h: "12",
	p: "2.5",
	bg: "white",
	borderRadius: "full",
	boxShadow: "md",
	cursor: "pointer",
});
