import { animate, style, transition, trigger } from '@angular/animations';

import { Anim, EaseOut } from '../css-utils';

export const splashCircle = trigger('splashCircle', [
	transition(':enter', [
			style({ opacity: 1, transform: 'scale(0)' }),
			animate(`${Anim.Duration.Long}ms ${EaseOut.Sine}`,
					style({ opacity: 0, transform: 'scale(1.333)' }),
				),
		])
]);
