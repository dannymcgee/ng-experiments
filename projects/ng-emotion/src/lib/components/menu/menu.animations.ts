import { animate, state, style, transition, trigger } from '@angular/animations';
import { Anim, EaseOut } from '../../utils';

export const actionMenu = trigger('actionMenu', [
	state('void', style({ height: 0, opacity: 0, transform: 'scale(0.667)' })),
	state('*', style({ height: '*', opacity: 1, transform: 'scale(1)' })),
	transition('void => *', animate(`${Anim.Duration.Short}ms ${EaseOut.Cubic}`)),
]);
