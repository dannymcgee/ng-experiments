import { animate, state, style, transition, trigger } from '@angular/animations';
import { Anim, EaseOut } from '../../utils';

export const actionMenu = trigger('actionMenu', [
	state('void', style({ opacity: 0, transform: 'scale(0.5, 0)' })),
	state('*', style({ opacity: 1, transform: 'scale(1)' })),
	transition('void => *', animate(`${Anim.Duration.Medium}ms ${EaseOut.Cubic}`)),
]);
