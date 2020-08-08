// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../core';
import { Position, rem } from '../../utils';

@Injectable()
export class FormFieldStyles extends EmotionStylesheet {

	host = css`
		label: form-field;
		display: block;
		position: relative;
	`;

	label = css`
		label: form-field__label;
		width: max-content;
		padding: 0 ${rem(5)} ${rem(3)} 0;
		${Position.absolute([rem(-7), undefined, undefined, undefined])};
		line-height: 1;
		background: #FFF;
	`;

}
