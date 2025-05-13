export function hexToRgb(hex: `#${string}`): [number, number, number] {
	const hexNumber = Number.parseInt(hex.slice(1), 16);
	const r = (hexNumber >> 16) & 0xff;
	const g = (hexNumber >> 8) & 0xff;
	const b = hexNumber & 0xff;
	return [r, g, b];
}
