import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	HostListener,
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

	private get _element (): HTMLInputElement|HTMLTextAreaElement|undefined {
		return this.elementRef.nativeElement;
	}

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

	@HostListener('input')
	onInput (): void {
		if (this._element) {
			const { value } = this._element;

			this._onChange(value);
		}
	}

	writeValue (value?: string): void {
		if (this._element) {
			this._element.value = value;
		}
	}

	private _onChange = (value?: string): void => {};
	registerOnChange (fn: (value?: string) => void): void {
		this._onChange = fn;
	}

	@HostListener('blur')
	private _onTouched = (): void => {}
	registerOnTouched (fn: () => void): void {
		this._onTouched = fn;
	}

	setDisabledState (isDisabled: boolean): void {}
}
