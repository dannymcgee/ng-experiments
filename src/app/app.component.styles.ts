import { Injectable } from '@angular/core';

import { css } from 'emotion';

import { rem, FontFamily, Mixins, Font } from '@theme';
import { EmotionStylesheet } from '@ng-emotion';

@Injectable()
export class AppStyles extends EmotionStylesheet
{
	base: string = css`
		display: block;
		padding: ${rem(64)};

		h4 {
			${Mixins.font(Font.H4)}
			color: #444;
		}

		section {
			margin: 0 0 ${rem(48)};

			h4 {
				margin-top: 0;
			}
		}

		button {
			margin: 0 8px;
		}
	`;

	flex: string = css`
		display: flex;
		align-items: flex-end;
	`;

	field: string = css`
		margin: 0 ${rem(8)};

		label {
			display: block;
			margin: 0 0 ${rem(8)};
			font: 700 ${rem(10)}/1 ${FontFamily.Gotham};
			color: #777;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		select {
			display: inline-flex;
			width: ${rem(180)};
			height: ${rem(36)};
			padding: 0 ${rem(8)};
			border: 2px solid #ccc;

			option {
				padding: ${rem(4)} ${rem(12)};
			}
		}
	`;
}
