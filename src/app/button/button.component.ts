import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

import { EmotionComponent, EmotionStylesheet, StyleModifier, StyleProp } from 'ng-emotion';
import { takeUntil } from 'rxjs/operators';

import { ThemeColor } from '@theme';
import { ButtonVariant } from './button.types';
import { ButtonStyles } from './button.component.styles';

@Component({
	selector: 'button[x-btn], a[x-btn]',
	templateUrl: './button.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: ButtonStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends EmotionComponent<ButtonStyles>
	implements OnInit, OnDestroy
{
	@StyleModifier()
	@Input('x-btn') variant: ButtonVariant = 'primary';

	@StyleProp()
	@Input() color: ThemeColor = 'primary';

	constructor(
		public elementRef: ElementRef<HTMLElement>,
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
