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
		${circle(32)};
		${Position.relative([8])};
		cursor: pointer;
	`;

	popup = css`
		label: color-picker__popup;
		display: flex;
		align-items: center;
		height: 103px;
		border-radius: 51.5px 0 0 51.5px;
		${Position.absolute([-28, null, null, -51.5])};
		z-index: 100;
		backdrop-filter: blur(12px);
		filter:
			drop-shadow(0 2px 4px rgba(0,0,0,0.1))
			drop-shadow(0 6px 12px rgba(0,0,0,0.175));
	`;

	disc = css`
		label: color-picker__disc;
		padding: ${rem(24)};
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		background: #FFF;

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
		min-width: ${rem(320)};
		padding: 16px 24px 16px 84px;
		margin-left: -68px;
		background: ${chroma('FFF').alpha(0.8).css()};
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

			&--first {
				margin: 4px 0;
			}
			&__track {
				width: 100%;
				height: 4px;
				border-radius: 3px;
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
