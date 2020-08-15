import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import { AppStyles } from './app.component.styles';

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
	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}
}
