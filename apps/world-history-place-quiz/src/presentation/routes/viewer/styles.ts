import { css } from "styled-system/css";

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

export const filterContainerStyle = css({
	position: "absolute",
	top: "4",
	left: "4",
	w: "80",
	h: "80",
	p: "4",
	bg: "white",
	borderRadius: "md",
	boxShadow: "md",
});
