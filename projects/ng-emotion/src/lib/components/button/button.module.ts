import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplashModule } from '../splash';
import { ButtonComponent } from './button.component';
import {
	ButtonSplashBlendModePipe,
	ButtonSplashOpacityPipe,
	ButtonSplashShadePipe,
} from './button.pipe';

@NgModule({
	declarations: [
		ButtonComponent,
		ButtonSplashBlendModePipe,
		ButtonSplashOpacityPipe,
		ButtonSplashShadePipe,
	],
	exports: [
		ButtonComponent,
	],
	imports: [
		CommonModule,
		SplashModule,
	],
})
export class ButtonModule {}
