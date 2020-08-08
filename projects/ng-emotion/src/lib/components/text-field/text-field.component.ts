import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { EmotionComponent, EmotionStylesheet } from '../../core';
import { FormFieldComponent, FormFieldControl } from '../form-field';
import { TextFieldStyles } from './text-field.component.styles';

@Component({
	selector: 'input[nge-text-field], textarea[nge-text-field]',
	template: '',
	providers: [{
		provide: EmotionStylesheet,
		useClass: TextFieldStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent
	extends EmotionComponent<TextFieldStyles>
	implements OnInit, OnDestroy, FormFieldControl<string>
{
	@HostBinding('id')
	@Input() id: string|null = null;

	get ngControl (): NgControl|null { return this._ngControl ?? null; }

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		@Optional() private formField: FormFieldComponent<string>,
		@Optional() @Self() private _ngControl: NgControl,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();

		if (this._ngControl)
			this._ngControl.valueAccessor = this;

		if (this.formField)
			this.formField.registerFormControl(this);
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	writeValue (value?: string): void {}

	private _onChange = (value?: string): void => {};
	registerOnChange (fn: (value?: string) => void): void {
		this._onChange = fn;
	}

	private _onTouched = (): void => {};
	registerOnTouched (fn: () => void): void {
		this._onTouched = fn;
	}

	setDisabledState (isDisabled: boolean): void {}
}
