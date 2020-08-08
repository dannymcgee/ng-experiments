import { ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { LabelState } from './label';

export interface FormFieldLabel {
	elementRef: ElementRef<HTMLElement>;
	for?: string;
	updateState (updates: Partial<LabelState>): void;
}

export interface FormFieldControl<T> extends ControlValueAccessor {
	elementRef: ElementRef<HTMLElement>;
	id: string|null;
	ngControl: NgControl|null;
	writeValue (value?: T): void;
	registerOnChange (fn: (value?: T) => void): void;
	registerOnTouched (fn: () => void): void;
	setDisabledState? (isDisabled: boolean): void;
}
