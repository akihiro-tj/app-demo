import { css, cva } from "@world-history-map/styled-system/css";

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
		display: "none",
		w: "80",
		h: "80",
		p: "4",
		bg: "white",
		borderRadius: "md",
		boxShadow: "md",
		md: {
			display: "block",
		},
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

export const drawerStyle = cva({
	base: {
		transitionProperty: "all",
		transitionDuration: "normal",
		transitionTimingFunction: "ease-in-out",
		position: "absolute",
		left: "0",
		right: "0",
		display: "block",
		overflowY: "scroll",
		w: "full",
		maxH: "50vh",
		p: "4",
		bg: "white",
		borderTopRadius: "2xl",
		boxShadow: "2xl",
		md: {
			display: "none",
		},
	},
	variants: {
		visible: {
			true: {
				bottom: "0",
			},
			false: {
				bottom: "-100%",
			},
		},
	},
});

export const drawerCloseButtonContainerStyle =
	sidePanelCloseButtonContainerStyle;

export const drawerCloseButtonStyle = sidePanelCloseButtonStyle;

export const filterPanelOpenButtonStyle = css({
	position: "absolute",
	top: "4",
	right: "4",
	bottom: "auto",
	left: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	w: "12",
	h: "12",
	bg: "white",
	borderRadius: "full",
	boxShadow: "md",
	cursor: "pointer",
	md: {
		top: "auto",
		right: "auto",
		bottom: "4",
		left: "4",
	},
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
