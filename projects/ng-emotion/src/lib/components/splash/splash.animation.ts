import { animate, state, style, transition, trigger } from '@angular/animations';

import { Anim, EaseOut } from '../../utils';

export const splash = trigger('splash', [
	state('void',
		style({
			opacity: 1,
			transform: 'scale(0)',
		})),
	transition(':enter', [
		// TODO: Make animation duration configurable
		animate(`${Anim.Duration.Long}ms ${EaseOut.Sine}`, style({
			opacity: 0,
			transform: 'scale(1.333)',
		})),
	]),
]);
