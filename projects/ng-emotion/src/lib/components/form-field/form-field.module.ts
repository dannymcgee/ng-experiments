import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormFieldComponent } from './form-field.component';
import { LabelComponent } from './label/label.component';

@NgModule({
	declarations: [
		FormFieldComponent,
		LabelComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		FormFieldComponent,
		LabelComponent,
	],
})
export class FormFieldModule {}
