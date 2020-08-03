import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownPanelComponent } from './dropdown-panel.component';

@NgModule({
	declarations: [
		DropdownPanelComponent,
	],
	imports: [
		BrowserAnimationsModule,
		CommonModule,
	],
	exports: [
		DropdownPanelComponent,
	],
})
export class DropdownPanelModule {}
