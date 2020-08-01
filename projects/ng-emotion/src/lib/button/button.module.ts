import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplashModule } from '../splash/splash.module';
import { ButtonComponent } from './button.component';

@NgModule({
	declarations: [
		ButtonComponent
	],
	exports: [
		ButtonComponent
	],
	imports: [
		CommonModule,
		SplashModule,
	]
})
export class ButtonModule {}
