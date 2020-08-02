import { FocusMonitor } from '@angular/cdk/a11y';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { EmotionComponent, EmotionStylesheet, StyleModifier, StyleProp } from '../core';
import { ThemeColor } from '../css-utils';
import { Coords } from '../splash';
import { ButtonStyles } from './button.component.styles';
import { ButtonVariant } from './button.types';

@Component({
	selector: 'button[nge-btn], a[nge-btn]',
	templateUrl: './button.component.html',
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

	rect: DOMRect;
	clicks: Coords[] = [];

	constructor (
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
		private focusMonitor: FocusMonitor,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		this.focusMonitor
			.monitor(this.elementRef)
				.pipe(takeUntil(this.onDestroy$))
				.subscribe();
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();

		this.focusMonitor.stopMonitoring(this.elementRef);
	}
}
