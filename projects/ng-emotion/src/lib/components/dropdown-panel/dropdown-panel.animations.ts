import { animate, group, state, style, transition, trigger } from '@angular/animations';

import { Anim, EaseOut } from '../../utils';

export const dropdownPanel = trigger('dropdownPanel', [
	state('void',
		style({
			opacity: 0,
			transform: 'scale(0.5, 0)',
		})),

	transition(':enter',
		group([
			animate(`${Anim.Duration.Short}ms ${EaseOut.Cubic}`, style({
				transform: 'scale(1)',
			})),
			animate(`${Anim.Duration.Short}ms linear`, style({
				opacity: 1,
			})),
		])),

	transition(':leave', [
		animate(`${Anim.Duration.Micro}ms ${Anim.Duration.Micro}ms linear`, style({
			opacity: 0,
		})),
	]),
]);
