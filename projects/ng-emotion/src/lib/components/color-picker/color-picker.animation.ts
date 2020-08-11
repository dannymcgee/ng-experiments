import { animate, group, query, sequence, style, transition, trigger } from '@angular/animations';

import { Anim, EaseIn, EaseOut } from '../../utils';

const wheelBounceIn = [
	style({
		opacity: 0,
		transform: 'scale(0)',
		zIndex: 10,
	}),
	group([
		animate(`${Anim.Duration.Micro}ms linear`,
			style({ opacity: 1 }),
		),
		animate(`${Anim.frameTime(10)}ms ${EaseOut.Overshoot}`,
			style({ transform: 'scale(1.0)' }),
		),
		sequence([
			animate(`${Anim.frameTime(6)}ms ${EaseOut.Cubic}`,
				style({ boxShadow: '0 9px 18px rgba(0,0,0,0.125)' }),
			),
			animate(`${Anim.frameTime(6)}ms ${EaseIn.Sine}`,
				style({ boxShadow: '0 0 0 transparent' }),
			),
		]),
	]),
];

const panelSlideIn = [
	style({
		opacity: 0,
		transform: 'translate3d(-72px, 0, 0) scale(0, 0.333)',
	}),
	group([
		animate(`${Anim.Duration.Medium}ms ${Anim.Duration.Short}ms linear`,
			style({ opacity: 1 }),
		),
		animate(`${Anim.frameTime(8)}ms ${Anim.Duration.Short}ms ${EaseOut.Quint}`,
			style({ transform: 'translate3d(0, 0, 0) scale(1, 1)' }),
		),
	]),
];

export const colorPickerPopup = trigger('colorPickerPopup', [
	transition(':enter', [
		group([
			style({ filter: 'drop-shadow(0 0 0 transparent)' }),
			animate(`${Anim.frameTime(10)}ms ${Anim.Duration.Short}ms ${EaseOut.Sine}`,
				style({ filter: 'drop-shadow(* * * *)' }),
			),
			query('.disc', wheelBounceIn, { optional: true }),
			query('.panel', panelSlideIn, { optional: true }),
		]),
	]),
	transition(':leave', [
		animate(`${Anim.Duration.Short}ms linear`,
			style({ opacity: 0 }),
		),
	]),
]);
