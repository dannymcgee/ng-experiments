import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplashModule } from '../splash';
import { MenuItemComponent } from './menu-item';
import { MenuComponent } from './menu.component';

@NgModule({
	declarations: [
		MenuComponent,
		MenuItemComponent,
	],
	imports: [
		CommonModule,
		SplashModule,
	],
	exports: [
		MenuComponent,
		MenuItemComponent,
	],
})
export class MenuModule {}
