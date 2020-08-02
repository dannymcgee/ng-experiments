import { DOCUMENT } from '@angular/common';
import { Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule, MenuModule } from '@ng-emotion/components';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		ButtonModule,
		MenuModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {

	constructor (
		@Inject(DOCUMENT) private document: Document,
	) {
		if (!this.document)
			return;

		this.document
			.getElementById('hco-fonts')
			.setAttribute('href', environment.hcoFontsLink);

		this.document.body.style.opacity = '1';
	}

}
