import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { EmotionComponent, EmotionStylesheet } from '@ng-emotion/core';
import { lerp } from '@ng-emotion/utils';

import { animationFrameScheduler } from 'rxjs';
import { startWith, takeUntil, throttleTime } from 'rxjs/operators';
import { ThemeColor } from '../../theme-color';
import { GradientStyles } from './gradient.component.styles';

@Component({
	selector: 'tg-gradient',
	template: ``,
	providers: [{
		provide: EmotionStylesheet,
		useClass: GradientStyles,
	}],
})
export class GradientComponent
	extends EmotionComponent<GradientStyles>
	implements OnInit, OnDestroy
{
	@Input() color: ThemeColor;

	constructor (
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		if (this.color) {
			this.color.changes$.pipe(
					startWith(undefined),
					throttleTime(0, animationFrameScheduler),
					takeUntil(this.onDestroy$),
				)
				.subscribe(this.updateGradient);
		}
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	updateGradient = (): void => {
		const element: HTMLElement|undefined = this.elementRef.nativeElement;
		if (!element)
			return;

		const { offsetWidth, style } = element;

		const colors: string[] = [];
		for (let i = 1; i <= offsetWidth; i++) {
			const shade = lerp(100, 900, i / offsetWidth);
			const color = this.color.get(shade);

			colors.push(color.hex());
		}

		const gradient = colors.reduce((result, color, index) => {
			const isLast = index === colors.length - 1;
			const trailing = isLast ? '' : ',';

			return result + ` ${color + trailing}`;
		}, 'to right,');

		style.setProperty('background-image', `linear-gradient(${gradient})`);
	}
}
