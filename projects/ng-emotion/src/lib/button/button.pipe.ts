import { Pipe, PipeTransform } from '@angular/core';

import { Alpha, BlendMode, ColorShade } from '../css-utils';
import { ButtonVariant } from './button.types';

@Pipe({ name: 'btnSplashBlendMode', pure: true })
export class ButtonSplashBlendModePipe implements PipeTransform {
	transform (variant: ButtonVariant): BlendMode {
		return variant === 'tertiary'
				? BlendMode.Multiply
				: BlendMode.Screen;
	}
}

@Pipe({ name: 'btnSplashOpacity', pure: true })
export class ButtonSplashOpacityPipe implements PipeTransform {
	transform (variant: ButtonVariant): Alpha {
		return variant === 'tertiary'
				? 0.25
				: 1;
	}
}

@Pipe({ name: 'btnSplashShade', pure: true })
export class ButtonSplashShadePipe implements PipeTransform {
	transform (variant: ButtonVariant): ColorShade {
		return variant === 'tertiary'
				? 200
				: 500;
	}
}
