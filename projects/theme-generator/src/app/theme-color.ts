import chroma, { Color, Scale } from 'chroma-js';

export enum ColorScaleMode {
	RGB = 'rgb',
	Lab = 'lab',
	HSL = 'hsl',
	LRGB = 'lrgb',
	Lch = 'lch',
}

export const COLOR_SHADES = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export class ThemeColor implements ThemeColor {

	// _palette: Map<number, Color> = new Map();
	private _shadeValues = new Map<number, string|Color>();
	private _scale: Scale;
	private _mode: ColorScaleMode;
	get mode (): ColorScaleMode { return this._mode; }
	set mode (value: ColorScaleMode) {
		this._mode = value;
		this._updateScale();
	}

	constructor (
		public name: string,
		baseColor: Color,
		mode: ColorScaleMode = ColorScaleMode.LRGB,
	) {
		this._shadeValues.set(0, '#FFF');
		this._shadeValues.set(500, baseColor);
		this._shadeValues.set(1000, '#000');

		this._mode = mode;

		this._updateScale();
	}

	get (shade: number): Color {
		return this._scale(shade);
	}

	has (shade: number): boolean {
		return this._shadeValues.has(shade);
	}

	toggle (shade: number): void {
		if (this._shadeValues.has(shade))
			this._shadeValues.delete(shade);
		else
			this._shadeValues.set(shade, this._scale(shade));

		this._updateScale();
	}

	set (shade: number, value: Color): void {
		this._shadeValues.set(shade, value);
		this._updateScale();
	}

	contrast (shade: number, compare: Color|string = '#FFF'): number {
		return chroma.contrast(this.get(shade), compare);
	}

	minContrastFor (shade: number, target: number = 4.5): Color {
		const s = this.minContrastShadeFor(shade, target);

		if (s === -1)
			return this.maxContrastFor(shade);

		return this.get(s);
	}

	minContrastShadeFor (shade: number, target: number = 4.5): number {
		const base = this.get(shade);

		for (let s = shade; s >= 0; s -= 100) {
			const compare = this.get(s);
			if (chroma.contrast(base, compare) >= target)
				return s;
		}

		for (let s = shade; s <= 1000; s += 100) {
			const compare = this.get(s);
			if (chroma.contrast(base, compare) >= target)
				return s;
		}

		console.error(`Couldn't find a color in range with adequate contrast for shade ${shade}!`);

		return -1;
	}

	maxContrastFor (shade: number): Color {
		const s = this.maxContrastShadeFor(shade);

		return this.get(s);
	}

	maxContrastShadeFor (shade: number): number {
		const lum = this
			.get(shade)
			.luminance();

		if (lum >= 0.5)
			return 1000;

		return 0;
	}

	private _updateScale (): void {
		const sortedEntries = Array
			.from(this._shadeValues.entries())
			.sort((a, b) => a[0] - b[0]);

		const shades = sortedEntries.map((entry) => entry[0]);
		const values = sortedEntries.map((entry) => entry[1]);

		this._scale = chroma
			.scale(values)
			.domain(shades)
			.mode(this._mode);
	}

}
