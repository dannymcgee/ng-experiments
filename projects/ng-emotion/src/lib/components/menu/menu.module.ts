import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownPanelModule } from '../dropdown-panel';
import { SplashModule } from '../splash';
import { MenuItemComponent } from './menu-item';
import { MenuComponent } from './menu.component';
import { ContextMenuDirective } from './menu.directive';

@NgModule({
	declarations: [
		MenuComponent,
		MenuItemComponent,
		ContextMenuDirective,
	],
	imports: [
		CommonModule,
		DropdownPanelModule,
		OverlayModule,
		SplashModule,
	],
	exports: [
		MenuComponent,
		MenuItemComponent,
		ContextMenuDirective,
	],
})
export class MenuModule {}
