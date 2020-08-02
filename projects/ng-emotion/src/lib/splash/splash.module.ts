import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashComponent } from './splash.component';
import { SplashGradientStopColorPipe, TransformOriginPipe } from './splash.pipe';

@NgModule({
	declarations: [
		SplashComponent,
		SplashGradientStopColorPipe,
		TransformOriginPipe
	],
	imports: [
		BrowserAnimationsModule,
		CommonModule
	],
	exports: [
		SplashComponent
	]
})
export class SplashModule {}
