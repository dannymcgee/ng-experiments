import { Injectable } from '@angular/core';

import { rem, Mixins, Font } from '@theme';
import { EmotionStylesheet, css, injectGlobal } from '@ng-emotion';

@Injectable()
export class AppStyles extends EmotionStylesheet
{
	global: void = injectGlobal`
		* {
			box-sizing: border-box;
			font-kerning: normal;
		}

		button {
			background: unset;
			border: none;
			-webkit-appearance: none;

			&:focus {
				outline: none;
			}
		}

		body {
			margin: 0;
			color: #444;
		}

		h1, h2, h3, h4, h5 {
			&:first-child {
				margin-top: 0;
			}
		}

		p:last-child {
			margin-bottom: 0;
		}

		h1 {
			${Mixins.font(Font.H1)};
		}
		h2 {
			${Mixins.font(Font.H2)};
		}
		h3 {
			${Mixins.font(Font.H3)};
		}
		h4 {
			${Mixins.font(Font.H4)};
		}
		h5 {
			${Mixins.font(Font.H5)};
		}
	`;

	base: string = css`
		label: root;
		display: block;
		padding: ${rem(64)};

		section {
			margin: 0 0 ${rem(48)};
		}

		button {
			margin: 0 8px;
		}
	`;

	flex: string = css`
		label: flex;
		display: flex;
		align-items: flex-end;
	`;

	field: string = css`
		label: field;
		margin: 0 ${rem(8)};

		label {
			display: block;
			margin: 0 0 ${rem(8)};
			${Mixins.font(Font.Label)}
			color: #777;
		}

		select {
			display: inline-flex;
			width: ${rem(180)};
			height: ${rem(36)};
			padding: 0 ${rem(8)};
			border-radius: ${rem(4)};
			color: #444;
			border: 2px solid #ccc;
			${Mixins.font(Font.UI)}

			option {
				padding: ${rem(4)} ${rem(12)};
			}
		}
	`;
}
