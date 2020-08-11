import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	Optional,
} from '@angular/core';

import chroma, { Color } from 'chroma-js';

import { NgControl } from '@angular/forms';
import { EmotionComponent, EmotionStylesheet } from '../../core';
import { FormFieldComponent, FormFieldControl } from '../form-field';
import { ColorPickerStyles } from './color-picker.component.styles';

@Component({
	selector: 'nge-color-picker',
	templateUrl: './color-picker.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: ColorPickerStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent
	extends EmotionComponent<ColorPickerStyles>
	implements OnInit, OnDestroy, FormFieldControl<Color>
{
	id: string|null = null;

	get ngControl (): NgControl { return this._ngControl; }

	color: Color = chroma('FFF');

	colorMode = 'HSB';
	colorModes = ['HSB'];

	// Storing these as separate properties is necessary to ensure the stability of the values.
	// Due to floating point precision issues (or maybe just quirks of the Chroma algorithms),
	// getting/setting any one of these directly from/to the Chroma instance causes the others
	// (particularly hue) to dance around and drift off target.

	set hue (hue: number) { this._hue = hue; this._updateHue(hue); }
	get hue (): number { return this._hue; }
	private _hue: number;

	set saturation (sat: number) { this._saturation = sat; this._updateSaturation(sat); }
	get saturation (): number { return this._saturation; }
	private _saturation: number;

	set brightness (val: number) { this._brightness = val; this._updateBrightness(val); }
	get brightness (): number { return this._brightness; }
	private _brightness: number;

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private _changeDetectorRef: ChangeDetectorRef,
		@Optional() private _formField: FormFieldComponent<Color>,
		@Optional() private _ngControl?: NgControl,
	) {
		super(elementRef, styles);

		if (this._ngControl)
			this._ngControl.valueAccessor = this;
	}

	ngOnInit (): void {
		super.ngOnInit();

		if (this._formField)
			this._formField.registerFormControl(this);

		if (
			this.color
			&& this._hue === undefined
			|| this._saturation === undefined
			|| this._brightness === undefined
		) {
			this._updateHsbFromColor(this.color);
		}
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	private _updateHsbFromColor (color: Color): void {
		let [hue, sat, val] = color.hsv();

		this._hue = hue;
		this._saturation = sat * 100;
		this._brightness = val * 100;
	}

	private _updateHue (hue: number): void {
		const updated = chroma.hsv(
				hue,
				this.saturation / 100,
				this.brightness / 100,
			);

		this.color = updated;
		this._onChange(updated);
	}

	private _updateSaturation (saturation: number): void {
		const updated = chroma.hsv(
				this.hue,
				saturation / 100,
				this.brightness / 100,
			);

		this.color = updated;
		this._onChange(updated);
	}

	private _updateBrightness (brightness: number): void {
		const updated = chroma.hsv(
				this.hue,
				this.saturation / 100,
				brightness / 100,
			);

		this.color = updated;
		this._onChange(updated);
	}

	writeValue (value?: Color): void {
		this.color = value ?? chroma('FFF');
		this._updateHsbFromColor(this.color);
		this._changeDetectorRef.markForCheck();
	}

	private _onChange = (value?: Color): void => {};
	registerOnChange (fn: (value?: Color) => void): void {
		this._onChange = fn;
	}

	private _onTouched = (): void => {};
	registerOnTouched (fn: () => void): void {
		this._onTouched = fn;
	}
}
