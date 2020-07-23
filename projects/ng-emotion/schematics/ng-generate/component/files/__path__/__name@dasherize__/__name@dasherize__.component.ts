import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { EmotionComponent, EmotionStylesheet } from 'ng-emotion';

import { <%= classify(name) %>Styles } from './<%= dasherize(name) %>.component.styles';

@Component({
	selector: '<%= selector %>',
	templateUrl: './<%= dasherize(name) %>.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: <%= classify(name) %>Styles,
	}],
})
export class <%= classify(name) %>Component extends EmotionComponent<<%= classify(name) %>Styles>
	implements OnInit, OnDestroy
{
	constructor(
		public elementRef: ElementRef,
		styles: EmotionStylesheet
	) {
		super(elementRef, styles);
	}

	ngOnInit(): void {
		super.ngOnInit();
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
