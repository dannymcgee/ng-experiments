import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ChangeDetectionStrategy, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { EmotionStylesheet, EmotionComponent, StyleModifier, StyleProp } from '../core';
import { ThemeColor } from '../theme';
import { ButtonStyles } from './button.component.styles';
import { ButtonVariant } from './button.types';

@Component({
	selector: 'button[nge-btn], a[nge-btn]',
	template: `<ng-content></ng-content>`,
	providers: [{
		provide: EmotionStylesheet,
		useClass: ButtonStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent
	extends EmotionComponent<ButtonStyles>
	implements OnInit, OnDestroy
{
	@StyleModifier()
	@Input('nge-btn') variant: ButtonVariant = 'primary';

	@StyleProp()
	@Input() color: ThemeColor = 'primary';

	constructor(
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private focusMonitor: FocusMonitor,
	) {
		super(elementRef, styles);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.focusMonitor
			.monitor(this.elementRef)
				.pipe(takeUntil(this.onDestroy$))
				.subscribe();
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();

		this.focusMonitor.stopMonitoring(this.elementRef);
	}
}
