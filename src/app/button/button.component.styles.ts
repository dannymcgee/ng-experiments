import { Injectable } from '@angular/core';
import { css } from 'emotion';

import { Colors, Mixins, rem, ThemeColor } from '@theme';
import { EmotionStylesheet } from '@ng-emotion';
import { ButtonVariant } from './button.types';

export interface ButtonStyleProps {
	color?: ThemeColor;
}

@Injectable()
export class ButtonStyles extends EmotionStylesheet
{
	props: ButtonStyleProps = {};

	readonly base: string = css`
		display: inline-flex;
		align-items: center;
		height: ${rem(36)};
		padding: 0 ${rem(18)};
		border: 2px solid transparent;
		border-radius: ${rem(2)};
		outline: none !important;
		${Mixins.transition('background', 'color', 'border-color', 'box-shadow')}
		font: 600 ${rem(14)}/1 sans-serif;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		cursor: pointer;
		user-select: none;
	`;

	get variantPrimary(): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const base = Colors[color]();
		const hover = Colors[color](200);
		const active = Colors[color](100);
		const focusring = Colors[color](500, 0.5);

		return css`
			background: ${base};
			color: #fff;

			&:hover {
				background: ${hover};
			}
			&:active {
				background: ${active};
			}
			&.cdk-keyboard-focused {
				background: ${hover};
				box-shadow: 0 0 0 4px ${focusring};
			}
		`;
	}

	get variantSecondary(): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const base = Colors[color]();
		const baseText = Colors[color](200);
		const border = Colors[color](400);
		const hoverActive = Colors[color](200);
		const keyboardActive = Colors[color](500, 0.125);
		const focusring = Colors[color](500, 0.5);

		return css`
			background: transparent;
			color: ${baseText};
			border-color: ${border};

			&:hover {
				background: ${base};
				border-color: ${base};
				color: #fff;
			}
			&:active {
				background: ${keyboardActive};
			}
			&:hover:active {
				background: ${hoverActive};
				border-color: ${hoverActive};
			}
			&.cdk-keyboard-focused {
				border-color: ${base};
				box-shadow: 0 0 0 4px ${focusring};
			}
		`;
	}

	get variantTertiary(): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const hoverText = Colors[color](200);
		const hoverBackground = Colors[color](500, 0.0625);
		const focusring = Colors[color](500, 0.25);
		const active = Colors[color](500, 0.125);

		return css`
			background: transparent;

			&:hover, &.cdk-keyboard-focused {
				background: ${hoverBackground};
				color: ${hoverText};
			}
			&.cdk-keyboard-focused {
				box-shadow: 0 0 0 4px ${focusring};
			}
			&:active {
				background: ${active};
			}
		`;
	}

	variant(variant: ButtonVariant): string|null {
		switch (variant) {
			case 'primary'   : return this.variantPrimary;
			case 'secondary' : return this.variantSecondary;
			case 'tertiary'  : return this.variantTertiary;
		}
	}
}
