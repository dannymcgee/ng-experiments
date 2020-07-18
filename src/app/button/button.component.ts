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

import { WithEmotion, StyleBinding } from '../ng-emotion/decorators';
import { EmotionComponent } from '../ng-emotion/classes';
import { ButtonStyle } from './button.types';
import { ButtonStyles } from './button.component.styles';

const WithStyles = WithEmotion(ButtonStyles);

@Component({
	selector: 'button[x-btn], a[x-btn]',
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
// @WithEmotion(ButtonStyles)
export class ButtonComponent implements OnInit, OnDestroy {
	static mixin = WithStyles(ButtonComponent);

	@HostBinding('class') baseClass = ButtonStyles.base;

	@StyleBinding('variant')
	@Input('x-btn') buttonStyle: ButtonStyle;

	@HostBinding('class.focus') isKeyboardFocused: boolean;

	constructor(
		public elementRef: ElementRef<HTMLElement>,
		private focusMonitor: FocusMonitor,
	) {}

	ngOnInit(): void {
		this.focusMonitor
			.monitor(this.elementRef)
			.pipe(takeUntil((this as any).onDestroy$))
			.subscribe((origin) => this.isKeyboardFocused = origin === 'keyboard');
	}

	ngOnDestroy(): void {
		this.focusMonitor.stopMonitoring(this.elementRef);
	}

	@HostListener('click')
	onClick(): void {
		const styles: ButtonStyle[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
		const random = Math.round(Math.random() * 4);

		this.buttonStyle = styles[random];
	}

}
