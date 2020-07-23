import { css } from 'ng-emotion';

import { Font, FontSize, FontFamily } from './fonts';
import { rem } from './utils';

export namespace Mixins
{
	export function transition(...properties: string[]): string {
		const transitionProperties = properties.join(', ');

		return css`
			transition-property: ${transitionProperties};
			transition-duration: 100ms;
			transition-timing-function: linear;
		`;
	}

	export function font(type: Font): string {
		switch (type) {
			case Font.UI :
				return css`
					font: 600
						${rem(FontSize.UI)}/1
						${FontFamily.WhitneyUI};
				`;
			case Font.Label :
				return css`
					font: 600
						${rem(FontSize.Small)}/1
						${FontFamily.WhitneySmallCaps};
					text-transform: lowercase;
					font-feature-settings: "liga" 1, "smcp" 1;
				`;
			case Font.Text :
				return css`
					font: 500
						${rem(FontSize.Text)}/1.6
						${FontFamily.WhitneyText};
				`;
			case Font.H5 : return heading(FontSize.H5);
			case Font.H4 : return heading(FontSize.H4);
			case Font.H3 : return heading(FontSize.H3);
			case Font.H2 : return heading(FontSize.H2);
			case Font.H1 : return heading(FontSize.H1);
		}
	}

	export function heading(
		size: Exclude<FontSize, FontSize.Small|FontSize.UI|FontSize.Text>
	): string {
		return css`
			font: 700
				${rem(size)}/1
				${FontFamily.Operator};
		`;
	}
}
