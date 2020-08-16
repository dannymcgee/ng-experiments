// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet, injectGlobal } from '@ng-emotion/core';

@Injectable()
export class AppStyles extends EmotionStylesheet {

	global: void = injectGlobal`
		* {
			box-sizing: border-box;
		}
	`;

	host = css`
		label: app;
		display: block;
		padding: 84px;

		.theme-colors {
			margin: 0 0 72px;
		}

		.new-color-form {
			width: max-content;

			&__fields {
				display: flex;

				> *:not(:last-child) {
					margin-right: 16px;
				}
			}

			&__name {
				width: 256px;
			}
			&__base-color {
				label {
					width: 100%;
					padding-right: 0;
					text-align: center;
				}
			}
			&__mode {
				width: 128px;
			}

			&__submit {
				margin-top: 16px;
				display: flex;
				justify-content: flex-end;
			}
		}
	`;

}
