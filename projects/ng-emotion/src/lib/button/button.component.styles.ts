// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../core';
import { Colors, Font, Mixins, Position, rem, ThemeColor } from '../theme';
import { ButtonVariant } from './button.types';

export interface ButtonStyleProps {
	color?: ThemeColor;
}

@Injectable()
export class ButtonStyles extends EmotionStylesheet {

	props: ButtonStyleProps = {};

	borderRadius = css`
		border-radius: ${rem(4)};
	`;

	readonly base = css`
		label: btn;
		display: inline-flex;
		align-items: center;
		height: ${rem(36)};
		padding: 0 ${rem(18)};
		${this.borderRadius};
		border-color: transparent;
		position: relative;
		overflow: visible;
		outline: none !important;
		${Mixins.transition(
				'background',
				'color',
				'border-color',
				'box-shadow'
			)};
		${Mixins.font(Font.UI)};
		cursor: pointer;
		user-select: none;

		.border-frame {
			${Position.absolute('fill')};
			${this.borderRadius};
			border: 2px solid;
			border-color: inherit;
		}
	`;

	get variantPrimary (): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const base = Colors[color]();
		const hover = Colors[color](200);
		const active = Colors[color](100);
		const focusring = Colors[color](500, 0.5);

		return css`
			label: btn--primary;
			background: ${base};
			color: #fff;

			&:hover {
				background: ${hover};
			}
			&.cdk-keyboard-focused {
				background: ${hover};
				box-shadow: 0 0 0 4px ${focusring};
			}
			&:active {
				background: ${active};
			}
		`;
	}
	get variantSecondary (): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const base = Colors[color]();
		const border = Colors[color](400);
		const hoverActive = Colors[color](200);
		const keyboardActive = Colors[color](500, 0.125);
		const focusring = Colors[color](500, 0.5);

		return css`
			label: btn--secondary;
			background: transparent;
			color: ${base};
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
	get variantTertiary (): string|null {
		const color: ThemeColor = this.props.color;

		if (!color) return null;

		const hoverText = Colors[color](200);
		const hoverBackground = Colors[color](500, 0.0625);
		const focusring = Colors[color](500, 0.25);
		const active = Colors[color](500, 0.125);

		return css`
			label: btn--tertiary;
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
				color: ${Colors[color](100)};
			}
		`;
	}
	variant (variant: ButtonVariant): string|null {
		switch (variant) {
			case 'primary'   : return this.variantPrimary;
			case 'secondary' : return this.variantSecondary;
			case 'tertiary'  : return this.variantTertiary;
		}
	}

	label = css`
		label: button__label;
		position: relative;
		z-index: 2;
	`;

	splash = css`
		label: button__splash;
		z-index: 1;
	`;
}
