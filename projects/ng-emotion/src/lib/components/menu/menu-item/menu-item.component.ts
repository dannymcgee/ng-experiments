import { FocusMonitor } from '@angular/cdk/a11y';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { EmotionComponent, EmotionStylesheet, StyleModifier } from '../../../core';
import { BlendMode } from '../../../utils';
import { MenuItemStyles } from './menu-item.component.styles';
import { MenuItemRole, MenuItemSize } from './menu-item.types';

@Component({
	selector: 'nge-menuitem, [nge-menuitem]',
	templateUrl: './menu-item.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: MenuItemStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent
	extends EmotionComponent<MenuItemStyles>
	implements OnInit, OnDestroy
{
	@StyleModifier()
	@Input() active = false;

	@StyleModifier()
	@Input() size: MenuItemSize = MenuItemSize.Standard;

	@HostBinding('attr.role')
	@Input()
	get role (): MenuItemRole { return this._role; }
	set role (value: MenuItemRole) {
		const needsCheck = value !== this._role;
		this._role = value;

		if (needsCheck)
			this.changeDetectorRef.markForCheck();
	}

	@StyleModifier('role')
	private _role: MenuItemRole = MenuItemRole.Link;

	BlendMode = BlendMode;

	constructor (
		public elementRef: ElementRef<HTMLElement>,
		styles: EmotionStylesheet,
		private focusMonitor: FocusMonitor,
		private changeDetectorRef: ChangeDetectorRef,
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
