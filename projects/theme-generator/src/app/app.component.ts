import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import chroma from 'chroma-js';

import { AppStyles } from './app.component.styles';
import { ColorScaleMode, EditableThemeColor } from './theme-color';

@Component({
	selector: 'tg-root',
	templateUrl: './app.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: AppStyles,
	}],
})
export class AppComponent
	extends EmotionComponent<AppStyles>
	implements OnInit, OnDestroy
{
	colors: EditableThemeColor[] = [];
	scaleModes = Object
		.entries(ColorScaleMode)
		.map(([label, value]) => ({ label, value }));

	newColorForm = this._formBuilder.group({
		name: ['', Validators.required],
		baseColor: [chroma('AAA')],
		mode: [ColorScaleMode.RGB],
	});

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private _formBuilder: FormBuilder,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	addNewColor (): void {
		const { name, baseColor, mode } = this.newColorForm.value;

		this.colors.push(new EditableThemeColor(name, baseColor, mode));
	}

	deleteColor (color: EditableThemeColor): void {
		this.colors = this.colors.filter((c) => c !== color);
	}

	log (message: string): void {
		console.log(message);
	}
}
