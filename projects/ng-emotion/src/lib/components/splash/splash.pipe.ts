import { Pipe, PipeTransform } from '@angular/core';

import { Alpha, Colors, ColorShade, ThemeColor } from '../../css-utils';
import { Coords } from './splash.types';

@Pipe({ name: 'splashGradientStopColor', pure: true })
export class SplashGradientStopColorPipe implements PipeTransform {
	transform (color: ThemeColor, shade: ColorShade, opacity: Alpha): string {
		return Colors.theme(color, shade, opacity);
	}
}

// TODO: This functionality isn't specific to the Splash; could probably be extracted to some sort of Common module
@Pipe({ name: 'transformOrigin', pure: true })
export class TransformOriginPipe implements PipeTransform {
	transform ({ x, y }: Coords): string {
		return `${x}px ${y}px`;
	}
}
