import { cva } from "styled-system/css";

export const buttonStyle = cva({
	base: {
		w: "full",
		py: "3",
		borderRadius: "sm",
		bg: "slate.100",
		fontWeight: "bold",
		_hover: {
			bg: "slate.200",
			cursor: "pointer",
		},
		_disabled: {
			pointerEvents: "none",
		},
	},
	variants: {
		isCorrect: {
			true: {
				bg: "emerald.400",
				color: "white",
			},
			false: {
				bg: "rose.400",
				color: "white",
			},
		},
	},
});
