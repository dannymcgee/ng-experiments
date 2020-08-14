import { animate, group, query, style, transition, trigger } from '@angular/animations';

import { Anim, EaseOut } from '../../utils';

const wheelBounceIn = [
	style({
		opacity: 0,
		transform: 'scale(0)',
		zIndex: 10,
	}),
	group([
		animate(`${Anim.Duration.Micro}ms linear`, style({
			opacity: 1,
		})),
		animate(`${Anim.frameTime(10)}ms ${EaseOut.Overshoot}`, style({
			transform: 'scale(1.0)',
		})),
	]),
];

const panelSlideIn = [
	style({
		opacity: 0,
		transform: 'translate3d(-72px, 0, 0) scale(0, 0.333)',
	}),
	group([
		animate(`${Anim.Duration.Medium}ms ${Anim.frameTime(3)}ms linear`, style({
			opacity: 1,
		})),
		animate(`${Anim.frameTime(8)}ms ${Anim.frameTime(3)}ms ${EaseOut.Quint}`, style({
			transform: 'translate3d(0, 0, 0) scale(1, 1)',
		})),
	]),
];

export const colorPickerPopup = trigger('colorPickerPopup', [
	transition(':enter', [
		style({
			width: '0',
		}),
		group([
			animate(`${Anim.frameTime(8)}ms ${Anim.frameTime(3)}ms ${EaseOut.Quint}`, style ({
				width: '*',
			})),
			query('.disc', wheelBounceIn, { optional: true }),
			query('.panel', panelSlideIn, { optional: true }),
		]),
	]),

	transition(':leave', [
		animate(`${Anim.Duration.Short}ms linear`, style({
			opacity: 0,
		})),
	]),
]);
