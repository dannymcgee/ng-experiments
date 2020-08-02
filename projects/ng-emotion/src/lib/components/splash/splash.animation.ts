import { animate, style, transition, trigger } from '@angular/animations';

import { Anim, EaseOut } from '../../css-utils';

export const splash = trigger('splash', [
	transition(':enter', [
			style({ opacity: 1, transform: 'scale(0)' }),
			// TODO: Make animation duration configurable
			animate(`${Anim.Duration.Long}ms ${EaseOut.Sine}`,
					style({ opacity: 0, transform: 'scale(1.333)' }),
				),
		])
]);
