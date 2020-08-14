import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
} from '@angular/core';

import { EmotionComponent, EmotionStylesheet, StyleModifier } from '../../core';
import { DynamicQueryList } from '../../utils';
import { MenuItemComponent, MenuItemRole, MenuItemSize } from './menu-item';
import { MenuStyles } from './menu.component.styles';
import { MENU_ROLES_LOOKUP } from './menu.constants';
import { MenuRole } from './menu.types';

@Component({
	selector: 'nge-menu',
	templateUrl: './menu.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: MenuStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent
	extends EmotionComponent<MenuStyles>
	implements OnInit, AfterContentInit, OnDestroy
{
	/** Convenience to set the size of all menu items in one place */
	@Input()
	get size (): MenuItemSize { return this._size; }
	set size (value: MenuItemSize) {
		this._size = value;

		if (this._contentInitialized)
			this._updateChildSizes();
	}
	private _size?: MenuItemSize;

	@HostBinding('attr.role')
	@Input()
	get role (): MenuRole { return this._role; }
	set role (value: MenuRole) {
		this._role = value;

		if (this._contentInitialized)
			this._updateChildRoles();
	}

	@StyleModifier('role')
	private _role: MenuRole = MenuRole.Navigation;

	@ContentChildren(MenuItemComponent)
	private _menuItems: QueryList<MenuItemComponent>;
	private _menuItemsDynamic: DynamicQueryList<MenuItemComponent>;
	private _contentInitialized: boolean;

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private changeDetectorRef: ChangeDetectorRef,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();
	}

	ngAfterContentInit (): void {
		this._menuItemsDynamic = new DynamicQueryList(this._menuItems);
		this._menuItemsDynamic.subscribe(this._onMenuItemsChanges);
		this._contentInitialized = true;
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
		this._menuItemsDynamic.destroy();
	}

	private _onMenuItemsChanges = (): void => {
		this._updateChildSizes();
		this._updateChildRoles();

		this.changeDetectorRef.detectChanges();
	}

	private _updateChildSizes (): void {
		this._menuItems.forEach((item) => item.size = this.size);
	}

	private _updateChildRoles (): void {
		const role: MenuItemRole = MENU_ROLES_LOOKUP[this.role];
		this._menuItems.forEach((item) => item.role = role);
	}
}
