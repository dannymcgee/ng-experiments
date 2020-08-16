// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors, Font, Mixins, rem } from '../../utils';

@Injectable()
export class FormFieldStyles extends EmotionStylesheet {

	host = css`
		label: form-field;
		display: block;
		position: relative;

		/* FIXME */
		&:focus-within > label {
			color: #222;
		}

		/* FIXME */
		nge-color-picker {
			> div:first-child {
				width: ${rem(32)};
				height: ${rem(32)};
				margin-top: ${rem(8)};
			}
		}

		/* FIXME */
		select {
			width: 100%;
			height: 40px;
			padding: 0 ${rem(8)};
			border: 2px solid #CCC;
			outline: none !important;
			${Mixins.font(Font.UI)};
			font-weight: 400;
			${Mixins.transition('border-color')};

			&:focus {
				border-color: ${Colors.primary(100)};
			}
		}
	`;

	label = css`
		label: form-field__label;
		width: max-content;
		padding: 0 ${rem(5)} ${rem(2)} 0;
		margin-bottom: ${rem(-7)};
		position: relative;
		z-index: 2;
		line-height: 1;
		background: #FFF;
	`;

}
