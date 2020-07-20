export type ThemeColor = 'primary'|'success'|'warning'|'danger';
export type ColorShade = 100|200|300|400|500;
export type ColorPalette = { [key in ColorShade]: string };

export class Colors
{
	private static _primary: ColorPalette = {
		100: '#0066AA',
		200: '#0077BB',
		300: '#0088CC',
		400: '#0099DD',
		500: '#00AAFF',
	};
	private static _success: ColorPalette = {
		100: '#008844',
		200: '#009955',
		300: '#00AA66',
		400: '#00BB77',
		500: '#00CC88',
	};
	private static _warning: ColorPalette = {
		100: '#CC6600',
		200: '#DD7700',
		300: '#EE8800',
		400: '#DD9900',
		500: '#FFAA00',
	};
	private static _danger: ColorPalette = {
		100: '#AA0000',
		200: '#BB0000',
		300: '#CC0000',
		400: '#DD4444',
		500: '#FF6666',
	};

	public static primary(shade: ColorShade = 300, opacity: number = 1): string {
		return this.themeColor('primary', shade, opacity);
	}
	public static success(shade: ColorShade = 300, opacity: number = 1): string {
		return this.themeColor('success', shade, opacity);
	}
	public static warning(shade: ColorShade = 300, opacity: number = 1): string {
		return this.themeColor('warning', shade, opacity);
	}
	public static danger(shade: ColorShade = 300, opacity: number = 1): string {
		return this.themeColor('danger', shade, opacity);
	}

	private static themeColor(name: ThemeColor, shade: ColorShade, opacity: number): string {
		const palette: ColorPalette = this[`_${name}`];
		const rgb = palette[shade];
		const alpha = (opacity >= 0 && opacity <= 1)
			? opacity
			: 1;
		const alphaHex = Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0')
			.toUpperCase();

		return `${rgb}${alphaHex}`;
	}
}
