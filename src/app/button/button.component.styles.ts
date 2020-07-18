import { css } from 'emotion';
import { Colors, Mixins, rem } from '@theme';
import { ButtonVariant } from 'src/app/button/button.types';

export class ButtonStyles {

	public static base: string = css`
		display: inline-flex;
		align-items: center;
		height: ${rem(32)};
		padding: 0 ${rem(24)};
		border-radius: ${rem(4)};
		outline: none !important;
		${Mixins.transition('background', 'color', 'border-color', 'box-shadow')}
		font: 700 ${rem(14)}/1 sans-serif;
		cursor: pointer;
		user-select: none;
	`;

	public variant = (style: ButtonVariant): string => {
		let base = '';
		let hover = '';
		let active = '';
		let focusring = '';

		if (style === 'secondary') {
			base = Colors.primary();
			hover = Colors.primary();
			active = Colors.primary(200);
			focusring = Colors.primary(500, 0.5);
		}
		else if (typeof Colors[style] === 'function') {
			base = Colors[style]();
			hover = Colors[style](200);
			active = Colors[style](100);
			focusring = Colors[style](500, 0.5);
		}
		else throw new Error(`Tried to get theme color with unknown name: '${style}'`);

		const baseState = (style === 'secondary')
			? css`
				background: transparent;
				color: ${base};
				border: 2px solid ${base};`
			: css`
				background: ${base};
				color: #fff;`;

		return css`
			${baseState};
			&:hover, &:active, &.focus {
				color: #fff;
			}
			&:hover {
				background: ${hover};
				border-color: ${hover};
			}
			&.focus {
				background: ${base};
				border-color: ${base};
				box-shadow: 0 0 0 4px ${focusring}
			}
			&:active {
				background: ${active};
				border-color: ${active};
			}
		`;
	}
}
