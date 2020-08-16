// tslint:disable:member-ordering newline-per-chained-call
import { Injectable } from '@angular/core';

import chroma from 'chroma-js';

import { css, EmotionStylesheet } from '../../core';
import { Colors, FontFamily, Mixins, Position, rem } from '../../utils';

function circle (size: number): string {
	return css`
		width: ${rem(size)};
		height: ${rem(size)};
		border-radius: 50%;
	`;
}

@Injectable()
export class ColorPickerStyles extends EmotionStylesheet {

	host = css`
		label: color-picker;
		display: block;
		position: relative;

		.control-knob {
			${circle(12)};
		}
	`;

	value = css`
		label: color-picker__value;
		${circle(40)};
		cursor: pointer;
	`;

	popup = css`
		label: color-picker__popup;
		display: flex;
		align-items: center;
		height: 80px;
		border-radius: 40px 0 0 40px;
		${Position.absolute([-20, null, null, -51.5])};
		z-index: 100;
		backdrop-filter: blur(8px);
	`;

	disc = css`
		label: color-picker__disc;
		flex-shrink: 0;
		padding: ${rem(24)};
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		background: #FFF;
		box-shadow:
			0 0  4px ${chroma('000').alpha(0.10).css()},
			0 0 12px ${chroma('000').alpha(0.15).css()};

		.control-knob {
			${Position.absolute([6, null, null, 'calc(50% - 6px)'])};
		}
		.hue-wheel {
			${circle(116)};
			${Position.absolute(['50%', null, null, '50%'])};
			transform: translateX(-50%) translateY(-50%);
			background: conic-gradient(#F00, #FF0, #0F0, #0FF, #00F, #F0F, #F00);
		}
		.hue-mask {
			${circle(108)};
			${Position.absolute(['50%', null, null, '50%'])};
			transform: translateX(-50%) translateY(-50%);
			background: #FFF;
		}
		.preview {
			${circle(88)};
			position: relative;
			cursor: pointer;
		}
		.hue-rotator {
			${Position.absolute('fill')};
			cursor: pointer;
		}
	`;

	panel = css`
		label: color-picker__panel;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: ${rem(320)};
		height: ${rem(80)};
		padding: 0 ${rem(24)} 0 ${rem(84)};
		margin-left: -68px;
		border-radius: ${rem(4)};
		background: ${chroma('F5F5F5').alpha(0.9).css()};
		transform-origin: left center;

		.channel-fields {
			display: flex;

			&__field {
				display: flex;
				align-items: center;
				height: 24px;
				margin: 0 1px;
				padding: 0 4px;
				border-radius: 0;
				border: 2px solid transparent;
				background: transparent;
				outline: none !important;
				${Mixins.transition('background', 'border-color')};
				font-family: ${FontFamily.WhitneyText};
				font-size: 13px;
				text-align: center;

				&:first-child { margin-left: 0 }
				&:last-child { margin-right: 0 }

				&:focus {
					background: #FFF;
					border-color: ${Colors.primary(100)};
				}

				&--mode {
					width: 33.333%;
					flex: 0 0 33.333%;
					font-weight: 800;
					cursor: pointer;
				}
				&--value {
					width: 22.222%;
					flex: 0 0 22.222%;
					&::-webkit-inner-spin-button,
					&::-webkit-outer-spin-button {
						-webkit-appearance: none;
					}
				}
			}
		}

		.channel-fields:hover .channel-fields__field {
			background: #FFF;
		}

		.slider {
			display: flex;
			align-items: center;
			width: 100%;
			height: 16px;
			margin: 0;
			padding: 0;
			position: relative;

			&__track {
				width: 100%;
				height: 4px;
				border-radius: 2px;
			}
			&__clamp {
				${Position.absolute([0, 4, 0, 4])};

				.control-knob {
					pointer-events: none;
					${Position.absolute([2])};
				}
			}

			&__native-input {
				width: 100%;
				margin: 0;
				${Position.absolute('fill')};
				opacity: 0 !important;
				cursor: pointer;
			}
		}
	`;

}
