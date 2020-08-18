import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import { Color } from 'chroma-js';

import { ColorScaleMode, EditableThemeColor } from '../theme-color';
import { ThemeColorStyles } from './theme-color.component.styles';

@Component({
	selector: 'tg-theme-color',
	templateUrl: './theme-color.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: ThemeColorStyles,
	}],
})
export class ThemeColorComponent
	extends EmotionComponent<ThemeColorStyles>
	implements OnInit, OnDestroy
{
	@Input() color: EditableThemeColor;
	@Output() deleted = new EventEmitter<void>();

	shades: number[] = [];
	debugShade = 500;
	colorScaleModes = Object
		.entries(ColorScaleMode)
		.map(([key, value]) => ({
			label: key,
			value,
		}));

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		for (let i = 100; i < 1000; i += 100)
			this.shades.push(i);
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	onColorShadeChange (color: Color): void {

	}
}
