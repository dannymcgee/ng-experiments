// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors, Mixins, Position, rem, ThemeColor } from '../../utils';
import { ButtonVariant } from './button.types';

export interface ButtonStyleProps {
	color?: ThemeColor;
}

@Injectable()
export class ButtonStyles extends EmotionStylesheet {

	props: ButtonStyleProps = {};

	host = css`
		label: btn;
		${Mixins.buttonLike('inline')};
		height: ${rem(36)};
		padding: 0 ${rem(18)};

		.border-frame {
			${Position.absolute('fill')};
			border: 2px solid;
			border-color: inherit;
		}
	`;

	get variantPrimary (): string|null {
		const color: ThemeColor|undefined = this.props.color;

		if (!color) return null;

		return css`
			label: btn--primary;
			background: ${Colors.theme(color)};
			color: #fff;

			&:hover {
				background: ${Colors.theme(color, 400)};
			}
			&.cdk-keyboard-focused {
				background: ${Colors.theme(color, 400)};
				box-shadow: 0 0 0 4px ${Colors.theme(color, 100, 0.5)};
			}
			&:active {
				background: ${Colors.theme(color, 500)};
			}
		`;
	}
	get variantSecondary (): string|null {
		const color: ThemeColor|undefined = this.props.color;

		if (!color) return null;

		const base = Colors.theme(color);
		const hoverActive = Colors.theme(color, 400);
		const keyboardActive = Colors.theme(color, 100, 0.125);

		return css`
			label: btn--secondary;
			background: transparent;
			color: ${base};
			border-color: ${Colors.theme(color, 200)};

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
				box-shadow: 0 0 0 4px ${Colors.theme(color, 100, 0.5)};
			}
		`;
	}
	get variantTertiary (): string|null {
		const color: ThemeColor|undefined = this.props.color;

		if (!color) return null;

		return css`
			label: btn--tertiary;
			background: transparent;

			&:hover, &.cdk-keyboard-focused {
				background: ${Colors.theme(color, 100, 0.0625)};
				color: ${Colors.theme(color, 400)};
			}
			&.cdk-keyboard-focused {
				box-shadow: 0 0 0 4px ${Colors.theme(color, 100, 0.25)};
			}
			&:active {
				background: ${Colors.theme(color, 100, 0.125)};
				color: ${Colors.theme(color, 500)};
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

	splashHost = css`
		label: button__splash-host;
		z-index: 1;
	`;
}
