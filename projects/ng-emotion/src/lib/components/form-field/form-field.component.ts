import { FocusMonitor } from '@angular/cdk/a11y';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { EmotionComponent, EmotionStylesheet } from '../../core';
import { elementId } from '../../utils';
import { FormFieldStyles } from './form-field.component.styles';
import { FormFieldControl, FormFieldLabel } from './form-field.types';

@Component({
	selector: 'nge-form-field',
	templateUrl: './form-field.component.html',
	providers: [{
		provide: EmotionStylesheet,
		useClass: FormFieldStyles,
	}],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent<T>
	extends EmotionComponent<FormFieldStyles>
	implements OnInit, OnDestroy
{
	private _formControl?: FormFieldControl<T>;
	private _label?: FormFieldLabel;

	constructor (
		public elementRef: ElementRef,
		styles: EmotionStylesheet,
		private _changeDetectorRef: ChangeDetectorRef,
		private _focusMonitor: FocusMonitor,
	) {
		super(elementRef, styles);
	}

	ngOnInit (): void {
		super.ngOnInit();
	}

	ngOnDestroy (): void {
		super.ngOnDestroy();
	}

	registerFormControl (formControl: FormFieldControl<T>): void {
		this._formControl = formControl;

		if (this._label)
			this._linkLabelAndControl();
	}

	registerLabel (label: FormFieldLabel): void {
		this._label = label;
		// TODO: Maybe set a StyleProp on the label instead?
		this._label.elementRef.nativeElement?.classList.add(this.styles.label);

		if (this._formControl)
			this._linkLabelAndControl();
	}

	private _linkLabelAndControl (): void {
		const id = this._formControl!.id ?? elementId('form-control');

		this._formControl!.id = id;
		this._label!.for = id;

		this._setupFocusMonitor();
		this._changeDetectorRef.detectChanges();
	}

	private _setupFocusMonitor (): void {
		this._focusMonitor
			.monitor(this._formControl!.elementRef)
				.pipe(takeUntil(this.onDestroy$))
				.subscribe((focusOrigin) => {
						this._label!.updateState({ focused: focusOrigin !== null });
					});

		this.onDestroy$.subscribe(() => {
				this._focusMonitor.stopMonitoring(this._formControl!.elementRef);
			});
	}
}
