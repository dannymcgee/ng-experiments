import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormFieldModule } from '../form-field';
import { TextFieldComponent } from './text-field.component';

@NgModule({
	declarations: [
		TextFieldComponent,
	],
	imports: [
		CommonModule,
		FormFieldModule,
	],
	exports: [
		TextFieldComponent,
	],
})
export class TextFieldModule { }
