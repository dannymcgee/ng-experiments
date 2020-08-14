import { Component } from '@angular/core';

import { ButtonVariant } from '@ng-emotion/components';
import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import { Colors, ThemeColor } from '@ng-emotion/utils';
import chroma from 'chroma-js';

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
	}],
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

	textFieldValue = '';
	primary = chroma(Colors.primary(300));
	success = chroma(Colors.success(300));
	warning = chroma(Colors.warning(300));
	danger = chroma(Colors.danger(300));
}
