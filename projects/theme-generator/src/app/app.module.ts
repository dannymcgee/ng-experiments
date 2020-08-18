import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
	ButtonModule,
	ColorPickerModule,
	FormFieldModule,
	TextFieldModule,
} from '@ng-emotion/components';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { GradientComponent } from './theme-color/gradient/gradient.component';
import { ThemeColorComponent } from './theme-color/theme-color.component';
import { ThemeColorPipe } from './theme-color/theme-color.pipe';

@NgModule({
	declarations: [
		AppComponent,
		GradientComponent,
		ThemeColorComponent,
		ThemeColorPipe,
	],
	imports: [
		BrowserModule,
		ButtonModule,
		ColorPickerModule,
		CommonModule,
		FormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		TextFieldModule,
	],
	providers: [],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule {

	constructor (
		@Inject(DOCUMENT) private document: Document,
	) {
		if (!this.document)
			return;

		this.document
			.getElementById('hco-fonts')
			?.setAttribute('href', environment.hcoFontsLink);

		this.document.body.style.opacity = '1';
	}

}
