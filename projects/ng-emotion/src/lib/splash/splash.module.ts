import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashComponent } from './splash.component';
import { GradientStopColorPipe, TransformOriginPipe } from './splash.pipe';

@NgModule({
	declarations: [
		GradientStopColorPipe,
		SplashComponent,
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
