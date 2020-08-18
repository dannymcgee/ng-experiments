import chroma, { Color, Scale } from 'chroma-js';
import { Observable, Subject } from 'rxjs';

export enum ColorScaleMode {
	RGB = 'rgb',
	Lab = 'lab',
	HSL = 'hsl',
	LRGB = 'lrgb',
	Lch = 'lch',
}

type AnchorEntries = [number, string|Color][];

function isChromaColor (object: unknown): object is Color {
	return (
			object != null
			&& typeof object === 'object'
			&& object!['alpha'] !== undefined
			&& typeof object!['alpha'] === 'function'
		);
}

export class ThemeColor {
	get changes$ (): Observable<void> { return this._changes$.asObservable(); }
	protected _changes$ = new Subject<void>();

	protected _anchors: Map<number, string|Color>;
	protected _scale: Scale;
	protected _mode: ColorScaleMode;

	constructor (
		public name: string,
		baseColorOrAnchors: AnchorEntries | Color,
		mode: ColorScaleMode = ColorScaleMode.RGB,
	) {
		this._anchors =
			isChromaColor(baseColorOrAnchors)
				? new Map<number, string|Color>()
				: new Map<number, string|Color>(baseColorOrAnchors);

		this._mode = mode;

		if (this._anchors.size)
			this._updateScale();
	}

	get (shade: number): Color {
		return this._scale(shade);
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

	protected _updateScale (): void {
		const sortedEntries = Array
			.from(this._anchors.entries())
			.sort((a, b) => a[0] - b[0]);

		const shades = sortedEntries.map((entry) => entry[0]);
		const values = sortedEntries.map((entry) => entry[1]);

		this._scale = chroma
			.scale(values)
			.domain(shades)
			.mode(this._mode);

		this._changes$.next();
	}
}

export class EditableThemeColor extends ThemeColor {
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
		super(name, baseColor, mode);

		this._anchors.set(0, '#FFF');
		this._anchors.set(500, baseColor);
		this._anchors.set(1000, '#000');

		this._updateScale();
	}

	hasAnchor (shade: number): boolean {
		return this._anchors.has(shade);
	}

	toggleAnchor (shade: number): void {
		if (this._anchors.has(shade))
			this._anchors.delete(shade);
		else
			this._anchors.set(shade, this._scale(shade));

		this._updateScale();
	}

	setAnchor (shade: number, value: Color): void {
		this._anchors.set(shade, value);
		this._updateScale();
	}

	contrast (shade: number, compare: Color|string = '#FFF'): number {
		return chroma.contrast(this.get(shade), compare);
	}

}
