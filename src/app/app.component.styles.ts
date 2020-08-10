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

	host: string = css`
		label: root;
		display: flex;
		width: 100%;
		height: 100%;

		section {
			margin: 0 0 ${rem(48)};
		}

		button {
			margin: 0 8px;
		}

		nge-form-field {
			margin-bottom: 36px;
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

	sidenav = css`
		label: sidenav;
		flex: 0 0 12.5%;
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
