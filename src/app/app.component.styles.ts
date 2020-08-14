import { Injectable } from '@angular/core';
import { css, EmotionStylesheet, injectGlobal } from '@ng-emotion/core';
import { Font, Mixins, rem } from '@ng-emotion/utils';

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

		html, body {
			height: 100%;
		}

		body {
			margin: 0;
			color: #444;
			${Mixins.transition('opacity')};
		}

		h1, h2, h3, h4, h5, h6 {
			margin: 2em 0 1.5em;

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
		h6 {
			${Mixins.font(Font.H6)};
		}
	`;

	host: string = css`
		label: root;
		display: flex;
		width: 100%;
		height: 100%;

		section {
			margin: 0 0 ${rem(48)};
		}

		button {
			margin-right: ${rem(16)};
		}

		nge-form-field {
			margin-bottom: 36px;
		}

		.field-group {
			display: flex;

			nge-form-field {
				margin-right: 32px;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	`;

	flex: string = css`
		label: flex;
		display: flex;
		align-items: flex-end;
	`;

	field: string = css`
		label: field;
		margin-right: ${rem(16)};

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

	sidenav = css`
		label: sidenav;
		flex: 0 0 20%;
		max-width: ${rem(256)};
		height: 100%;
		padding: ${rem(64)} 0;
	`;

	main = css`
		label: main;
		flex: 1 0 0;
		height: 100%;
		padding: ${rem(64)};
		overflow-y: auto;
	`;
}
