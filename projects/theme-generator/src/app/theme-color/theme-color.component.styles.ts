// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '@ng-emotion/core';
import { Colors, FontFamily, FontSize, Mixins, rem } from '@ng-emotion/utils';

@Injectable()
export class ThemeColorStyles extends EmotionStylesheet {

	host = css`
		label: theme-color;
		display: block;
		width: max-content;

		header {
			display: flex;
			align-items: center;
			margin: 48px 0 16px;

			.name {
				margin: 0 16px 0 0;
			}

			.mode {
				width: 128px;
			}

			.delete {
				width: ${rem(32)};
				height: ${rem(32)};
				border-radius: ${rem(16)};
				margin-right: ${rem(8)};
				margin-left: auto;
				-webkit-appearance: none;
				border: none;
				background: #EEE;
				outline: none !important;
				${Mixins.transition('background', 'color')};
				font-size: ${rem(FontSize.H3)};
				line-height: ${rem(32)};
				cursor: pointer;

				&:hover {
					background: ${Colors.danger()};
					color: #FFF;
				}
			}
		}

		.shades {
			display: flex;
		}

		.shade,
		.labels {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}

		.labels {
			align-items: flex-end;
			padding-right: ${rem(16)};

			span {
				display: inline-flex;
				align-items: center;
				height: ${rem(48)};
			}
		}

		.shade {
			align-items: center;
			width: ${rem(48)};

			&--readonly {
				background: #EEE;

				.contrast,
				nge-color-picker {
					pointer-events: none;
					opacity: 0.75;
				}
			}

			> * {
				display: flex;
				align-items: center;
				justify-content: center;
				width: ${rem(48)};
				height: ${rem(48)};
			}
		}

		.contrast {
			display: flex;
			align-items: center;
			justify-content: center;
			width: ${rem(42)};
			height: ${rem(42)};
			border-radius: ${rem(4)};
			font-family: ${FontFamily.Operator};
			font-size: ${FontSize.UI}px;
			font-weight: 500;

			&--inverse {
				color: #FFF;
			}
		}

		.debug {

		}

		.debug-preview {
			display: flex;
			align-items: center;
			justify-content: center;
			width: ${rem(42)};
			height: ${rem(42)};
			border-radius: ${rem(4)};
			font-family: ${FontFamily.Operator};
			font-size: ${FontSize.UI}px;
			font-weight: 500;
		}
	`;

}
