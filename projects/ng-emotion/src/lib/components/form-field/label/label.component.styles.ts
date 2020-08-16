// tslint:disable:member-ordering
import { Injectable } from '@angular/core';

import { css, EmotionStylesheet } from '../../../core';
import { Font, Mixins } from '../../../utils';
import { LabelState } from './label.types';

@Injectable()
export class LabelStyles extends EmotionStylesheet {

	host = css`
		label: label;
		display: block;
		${Mixins.font(Font.Label)};
		${Mixins.transition('color')};
	`;

	state = (state: LabelState) => css`
		color: ${state.focused ? '#222' : '#AAA'};
	`

}
