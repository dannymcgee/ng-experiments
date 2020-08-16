// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Colors, FontFamily, FontSize, Mixins, rem } from '../../utils';

@Injectable()
export class TextFieldStyles extends EmotionStylesheet {

	host = css`
		label: text-field;
		display: block;
		width: 100%;
		height: ${rem(40)};
		padding: 0 ${rem(12)};
		border: 2px solid #CCC;
		font-family: ${FontFamily.WhitneyText};
		font-size: ${FontSize.Small};
		font-weight: 500;
		line-height: 1;
		outline: none !important;
		${Mixins.transition('border-color')};

		&:focus {
			border-color: ${Colors.primary(100)};
		}
	`;

}
