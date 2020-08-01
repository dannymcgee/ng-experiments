import { Pipe, PipeTransform } from '@angular/core';

import { Alpha, Colors, ColorShade, ThemeColor } from '../theme';
import { Coords } from './splash.types';

@Pipe({ name: 'transformOrigin', pure: true })
export class TransformOriginPipe implements PipeTransform {
	transform ({ x, y }: Coords): string {
		return `${x}px ${y}px`;
	}
}

@Pipe({ name: 'gradientStopColor', pure: true })
export class GradientStopColorPipe implements PipeTransform {
	transform (color: ThemeColor, shade: ColorShade, opacity: Alpha): string {
		return Colors[color](shade, opacity);
	}
}

