// tslint:disable:member-ordering newline-per-chained-call
import { Injectable } from '@angular/core';

import chroma from 'chroma-js';

import { css, EmotionStylesheet } from '../../core';
import { Position, rem } from '../../utils';

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
			${circle(16)};
		}
	`;

	value = css`
		label: color-picker__value;
		${circle(32)};
		${Position.relative([8])};
	`;

	popup = css`
		label: color-picker__popup;
		display: flex;
		align-items: center;
		height: 103px;
		border-radius: 51.5px 0 0 51.5px;
		${Position.absolute([0, null, null, 0])};
		z-index: 100;
		backdrop-filter: blur(12px);
		filter:
			drop-shadow(0 2px 4px rgba(0,0,0,0.1))
			drop-shadow(0 6px 12px rgba(0,0,0,0.175));
	`;

	disc = css`
		label: color-picker__disc;
		padding: ${rem(32)};
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		background: #FFF;

		.control-knob {
			${Position.absolute([8, null, null, 'calc(50% - 8px)'])};
		}
		.hue-wheel {
			${circle(110)};
			${Position.absolute(['50%', null, null, '50%'])};
			transform: translateX(-50%) translateY(-50%);
			background: conic-gradient(#F00, #FF0, #0F0, #0FF, #00F, #F0F, #F00);
		}
		.hue-mask {
			${circle(100)};
			${Position.absolute(['50%', null, null, '50%'])};
			transform: translateX(-50%) translateY(-50%);
			background: #FFF;
		}
		.preview {
			${circle(72)};
			position: relative;
		}
		.hue-rotator {
			${Position.absolute('fill')};
			cursor: pointer;
		}
	`;

	panel = css`
		label: color-picker__panel;
		padding: 16px 24px 16px 84px;
		margin-left: -68px;
		background: ${chroma('FFF').alpha(0.8).css()};

		.channel-fields {
			display: flex;

			&__field {
				flex: 0 0 33.333%;
				margin: 0;
				padding: 0;
			}
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
				margin: 12px 0 8px;
			}
			&__track {
				width: 100%;
				height: 6px;
				border-radius: 3px;
			}
			&__clamp {
				${Position.absolute([0, 4, 0, 4])};

				.control-knob {
					pointer-events: none;
					${Position.absolute([0])};
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
