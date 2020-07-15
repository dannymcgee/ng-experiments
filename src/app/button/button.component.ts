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

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ButtonStyle } from './button.types';
import { buttonBase, buttonStyle } from './button.component.styles';

@Component({
	selector: 'button[x-btn], a[x-btn]',
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {

	@Input('x-btn') buttonStyle: ButtonStyle;

	@HostBinding('class') get hostClasses(): string[] {
		const classes = [buttonBase];
		if (this.buttonStyle) classes.push(buttonStyle(this.buttonStyle));

		return classes;
	}
	@HostBinding('class.focus') isKeyboardFocused: boolean;
	@HostBinding('class.active') isPressed: boolean;

	protected readonly destroyed = new Subject<void>();

	constructor(
		private elementRef: ElementRef<HTMLElement>,
		private focusMonitor: FocusMonitor,
	) {}

	ngOnInit(): void {
		this.focusMonitor
			.monitor(this.elementRef)
			.pipe(takeUntil(this.destroyed))
			.subscribe((origin) => this.isKeyboardFocused = origin === 'keyboard');
	}

	ngOnDestroy(): void {
		this.destroyed.next();
		this.destroyed.complete();
		this.focusMonitor.stopMonitoring(this.elementRef);
	}

}
