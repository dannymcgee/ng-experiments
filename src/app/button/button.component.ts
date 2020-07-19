import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

import { takeUntil } from 'rxjs/operators';

import { EmotionComponent, EmotionStyler, StyleModifier, StyleProperty } from '@ng-emotion';
import { ThemeColor } from '@theme';
import { ButtonVariant } from './button.types';
import { ButtonStyles } from './button.component.styles';

@Component({
	selector: 'button[x-btn], a[x-btn]',
	templateUrl: './button.component.html',
	providers: [{
		provide: EmotionStyler,
		useClass: ButtonStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends EmotionComponent<ButtonStyles>
	implements OnInit, OnDestroy
{
	@StyleModifier('variant')
	@Input('x-btn') variant: ButtonVariant = 'primary';

	@StyleProperty()
	@Input() color: ThemeColor = 'primary';

	@HostBinding('class.focus') isKeyboardFocused: boolean;

	constructor(
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStyler,
		private focusMonitor: FocusMonitor,
	) {
		super(elementRef, styles);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.focusMonitor
			.monitor(this.elementRef)
			.pipe(takeUntil(this.onDestroy$))
			.subscribe((origin) => this.isKeyboardFocused = origin === 'keyboard');
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();

		this.focusMonitor.stopMonitoring(this.elementRef);
	}

}
