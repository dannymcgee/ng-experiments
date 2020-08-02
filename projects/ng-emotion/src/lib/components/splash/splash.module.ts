import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashHostComponent } from './splash.component';
import { SplashGradientStopColorPipe, TransformOriginPipe } from './splash.pipe';

@NgModule({
	declarations: [
		SplashHostComponent,
		SplashGradientStopColorPipe,
		TransformOriginPipe,
	],
	imports: [
		BrowserAnimationsModule,
		CommonModule,
	],
	exports: [
		SplashHostComponent,
	],
})
export class SplashModule {}
