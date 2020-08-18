import { Pipe, PipeTransform } from '@angular/core';

import chroma from 'chroma-js';

import { lerp } from '../../utils';

@Pipe({ name: 'controlKnobColor', pure: true })
export class ColorPickerControlKnobPipe implements PipeTransform {
	// tslint:disable:newline-per-chained-call
	transform (
		value: number,
		controlType: 'hue'|'saturation'|'brightness',
		hue?: number,
	): string {
		const val = controlType === 'hue'
			? value
			: value / 100;

		const brt = controlType === 'saturation'
			? lerp(0.75, 1, val)
			: 1;

		if (
			(controlType === 'saturation' || controlType === 'brightness')
			&& hue === undefined
		)
			throw new Error(
				`controlKnobColor needs a 'hue' argument when controlType is '${controlType}'!`,
				);

		switch (controlType) {
			case 'hue'        : return chroma.hsv(val, 1.0, brt).css('hsl');
			case 'saturation' : return chroma.hsv(hue!, val, brt).css('hsl');
			case 'brightness' : return chroma.hsv(hue!, 1.0, val).css('hsl');
		}
	}
	// tslint:enable:newline-per-chained-call
}

@Pipe({ name: 'sliderTrackGradient', pure: true })
export class ColorPickerSliderTrackGradientPipe implements PipeTransform {
	transform (hue: number, controlType: 'saturation'|'brightness'): string {
		const startColor =
			controlType === 'saturation'
				? chroma.hsv(hue, 0, 0.75)
				: chroma.hsv(hue, 1, 0);
		const endColor = chroma.hsv(hue, 1, 1);

		return `linear-gradient(
				to right,
				${startColor.css('hsl')},
				${endColor.css('hsl')}
			)`;
	}
}

@Pipe({ name: 'sliderKnobOffset', pure: true })
export class ColorPickerSliderKnobOffsetPipe implements PipeTransform {
	transform (value: number): string {
		return `calc(${value}% - 8px)`;
	}
}
