import { FocusMonitor } from '@angular/cdk/a11y';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { EmotionComponent, EmotionStylesheet, StyleModifier, StyleProp } from '../core';
import { Anim, ThemeColor } from '../css-utils';
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
		private changeDetectorRef: ChangeDetectorRef,
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

	@HostListener('mouseenter')
	onMouseEnter (): void {
		this.rect = this.elementRef.nativeElement.getBoundingClientRect();
	}

	@HostListener('mousedown', ['$event'])
	onMouseDown ({ x, y }: MouseEvent): void {
		const origin = {
			x: x - this.rect.left,
			y: y - this.rect.top,
		};
		this.clicks.push(origin);

		setTimeout(() => {
				this.clicks.shift();
				this.changeDetectorRef.detectChanges();
			}, Anim.Duration.Long);
	}
}
