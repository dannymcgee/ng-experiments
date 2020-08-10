import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerHueRotatorDirective } from './color-picker.directive';
import {
	ColorPickerControlKnobPipe,
	ColorPickerSliderKnobOffsetPipe,
	ColorPickerSliderTrackGradientPipe,
} from './color-picker.pipe';

@NgModule({
	declarations: [
		ColorPickerComponent,
		ColorPickerControlKnobPipe,
		ColorPickerHueRotatorDirective,
		ColorPickerSliderKnobOffsetPipe,
		ColorPickerSliderTrackGradientPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		ColorPickerComponent,
	],
})
export class ColorPickerModule {}
