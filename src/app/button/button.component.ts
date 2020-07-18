import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
	HostListener,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

import { takeUntil } from 'rxjs/operators';

import { WithEmotion, DynamicStyle } from '../ng-emotion/decorators';
import { EmotionComponent } from '../ng-emotion/classes';
import { ButtonVariant } from './button.types';
import { ButtonStyles } from './button.component.styles';

@Component({
	selector: 'button[x-btn], a[x-btn]',
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
@WithEmotion(ButtonStyles)
export class ButtonComponent extends EmotionComponent
	implements OnInit, OnDestroy
{
	@HostBinding('class') baseClass = ButtonStyles.base;

	@DynamicStyle('variant')
	@Input('x-btn') variant: ButtonVariant;

	@HostBinding('class.focus') isKeyboardFocused: boolean;

	constructor(
		public elementRef: ElementRef<HTMLElement>,
		private focusMonitor: FocusMonitor,
	) {
		super(elementRef);
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

	@HostListener('click')
	onClick(): void {
		const styles: ButtonVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
		const random = Math.round(Math.random() * 4);

		this.variant = styles[random];
	}

}
