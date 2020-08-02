export type ThemeColor = 'primary'|'success'|'warning'|'danger';
export type ColorShade = 100|200|300|400|500;
export type ColorPalette = { [key in ColorShade]: string };
/** A value between 0 and 1 which represents a percentage. */
export type Alpha = number;

export class Colors
{
	private static _primary: ColorPalette = {
		100: '#00AAFF',
		200: '#0099DD',
		300: '#0088CC',
		400: '#0077BB',
		500: '#0066AA',
	};
	private static _success: ColorPalette = {
		100: '#00CC88',
		200: '#00BB77',
		300: '#00AA66',
		400: '#009955',
		500: '#008844',
	};
	private static _warning: ColorPalette = {
		100: '#FFAA00',
		200: '#FF9900',
		300: '#EE8800',
		400: '#DD7700',
		500: '#CC6600',
	};
	private static _danger: ColorPalette = {
		100: '#FF6666',
		200: '#DD4444',
		300: '#CC0000',
		400: '#BB0000',
		500: '#AA0000',
	};

	static primary (shade: ColorShade = 300, opacity: Alpha = 1): string {
		return this.theme('primary', shade, opacity);
	}
	static success (shade: ColorShade = 300, opacity: Alpha = 1): string {
		return this.theme('success', shade, opacity);
	}
	static warning (shade: ColorShade = 300, opacity: Alpha = 1): string {
		return this.theme('warning', shade, opacity);
	}
	static danger (shade: ColorShade = 300, opacity: Alpha = 1): string {
		return this.theme('danger', shade, opacity);
	}

	static theme (
		name: ThemeColor,
		shade: ColorShade = 300,
		opacity: Alpha = 1,
	): string {
		const palette: ColorPalette = this[`_${name}`];
		const rgb = palette[shade];
		const alpha =
			(opacity >= 0 && opacity <= 1)
				? opacity
				: 1;
		const alphaHex =
			Math.round(alpha * 255)
				.toString(16)
				.padStart(2, '0')
				.toUpperCase();

		return `${rgb}${alphaHex}`;
	}
}
