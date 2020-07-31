import { Component } from '@angular/core';
import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import { ButtonVariant } from '@ng-emotion/button';
import { ThemeColor } from '@ng-emotion/theme';

import { AppStyles } from './app.component.styles';

interface VariantOption {
	value: ButtonVariant;
	name: string;
}

interface ColorOption {
	value: ThemeColor;
	name: string;
}

@Component({
	selector: 'x-root',
	templateUrl: './app.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: AppStyles,
	}]
})
export class AppComponent extends EmotionComponent<AppStyles>
{
	variants: VariantOption[] = [
		{ value: 'primary', name: 'Primary' },
		{ value: 'secondary', name: 'Secondary' },
		{ value: 'tertiary', name: 'Tertiary' },
	];

	colors: ColorOption[] = [
		{ value: 'primary', name: 'Primary' },
		{ value: 'success', name: 'Success' },
		{ value: 'warning', name: 'Warning' },
		{ value: 'danger', name: 'Danger' },
	];

	variant: ButtonVariant = 'primary';
	color: ThemeColor = 'primary';
}
